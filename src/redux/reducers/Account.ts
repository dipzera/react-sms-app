import { UPDATE_SETTINGS } from "redux/constants/Account";

export interface IAccount {
  Company?: string;
  CompanyID?: number;
  Email?: string;
  FirstName?: string;
  ID?: number;
  LastName?: string;
  Password?: string;
  PhoneNumber?: string;
  Photo?: string;
  UiLanguage?: number;
}
const initialState = {
  Company: "",
  CompanyID: null,
  Email: "",
  FirstName: null,
  ID: null,
  LastName: null,
  Password: null,
  PhoneNumber: null,
  Photo: null,
  UiLanguage: 0,
};
const account = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default account;
