import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { RolesGuard } from '../../guards/roles.guard';
import { editFileName } from '../../utils/file-uploading.utils';
import { imageFileFilter } from '../../utils/imageFileFilter';
import { Role } from '../../utils/role.enum';
import { Roles } from '../../utils/roles.decorator';
import { NewHotelDto } from './dto/newHotel.dto';
import { NewRoomDto } from './dto/newRoom.dto';
import { SearchHotelsDto } from './dto/searchHotels.dto';
import { SearchRoomsDto } from './dto/searchRooms.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { HotelRoomsService } from './hotel.rooms.service';
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Hotel')
@Controller()
export class HotelsController {
  constructor(
    private readonly hotelService: HotelsService,
    private readonly hotelRoomService: HotelRoomsService,
  ) { }

  // @Get('/test')
  // getImg(@Res() res) {
  //   return res.sendFile(join(__dirname, '../../..', '/files/images.png'));
  // }

  @Get('/hotels/')
  searchHotels(@Query() data: SearchHotelsDto) {
    return this.hotelService.search(data);
  }

  @Get('/hotel-rooms')
  searchRooms(@Query() data: SearchRoomsDto) {
    return this.hotelRoomService.search(data);
  }

  @Get('/hotel-rooms/:id')
  findRoom(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }

  @Post('/admin/hotels/')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  addNewHotel(
    @Body() data: NewHotelDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { title, description, city } = data;
    let images = [];
    files.forEach((file) => images.push(file.filename));
    console.log(files)
    return this.hotelService.create({
      title, description, city, images
    });
  }

  @Post('/admin/hotel-rooms/')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  addNewRoom(
    @Body() data: NewRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { title, hotelId, description } = data;
    let images = [];
    files.forEach((file) => images.push(file.filename));
    return this.hotelRoomService.create({
      title,
      hotel: hotelId,
      description,
      images: images,
    });
  }

  @Put('/admin/hotels/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  updateHotel(@Param('id') id, @Body() data: NewHotelDto) {
    return this.hotelService.update(id, data);
  }

  @Put('/admin/hotel-rooms/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateRoom(
    @Body() body: UpdateRoomDto,
    @Param('id') id,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { title, hotelId, description, imageFiles, isEnabled } = body;
    let images = [];
    files.forEach((file) => images.push(file.filename));
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => images.push(file));
    }
    return this.hotelRoomService.update(id, {
      title,
      hotel: hotelId,
      description,
      isEnabled,
      images: images,
    });
  }
}
