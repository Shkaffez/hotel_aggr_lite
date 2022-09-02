import { SearchUserParams } from '../modules/users/interfaces';

export const searchFilters = (params: SearchUserParams) => {
  const { email, name, contactPhone } = params;
  let filters = {
    email: undefined,
    name: undefined,
    contactPhone: undefined,
  };
  if (email) {
    filters.email = { $regex: email };
  }
  if (name) {
    filters.name = { $regex: name };
  }
  if (contactPhone) {
    filters.contactPhone = { $regex: contactPhone };
  }

  // Я использовал такут громоздкую конструкцию, потому что typescript не позволяет динимически
  // добавлять свойства в объекты

  if (!filters.email) {
    delete filters.email;
  }
  if (!filters.name) {
    delete filters.name;
  }
  if (!filters.contactPhone) {
    delete filters.contactPhone;
  }

  return filters;
};
