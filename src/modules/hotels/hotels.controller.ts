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

/*
  Добавить DELETE методы отеля и комнаты для админа.
  Дописать обработку файлов PUT методам.
*/

@ApiTags('Hotel')
@Controller()
export class HotelsController {
  constructor(
    private readonly hotelService: HotelsService,
    private readonly hotelRoomService: HotelRoomsService,
  ) { }


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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  addNewHotel(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: NewHotelDto,
  ) {
    console.log(files)
    const { title, description, city } = data;
    let images = [];
    files.forEach((file) => images.push(file.filename));
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  addNewRoom(
    @Body() data: NewRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { title, hotelId, description } = data;
    let images = [];
    files.forEach((file) => images.push(file.filename));
    console.log(images);
    return this.hotelRoomService.create({
      title,
      hotel: hotelId,
      description,
      images: images,
    });
  }

  @Put('/admin/hotels/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
