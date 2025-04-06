import type { IDateValue, IDatePickerControl } from './common';

// ----------------------------------------------------------------------

export type ITourFilters = {
  services: string[];
  destination: string[];
  tourGuides: ITourGuide[];
  startDate: IDatePickerControl;
  endDate: IDatePickerControl;
};

export type ITourGuide = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type TourGuide = {
  _id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type ITourBooker = {
  id: string;
  name: string;
  guests: number;
  avatarUrl: string;
};

export type ITourItem = {
  id: string;
  name: string;
  price: number;
  totalViews: number;
  tags: string[];
  content: string;
  publish: string;
  images: string[];
  durations: string;
  priceSale: number;
  services: string[];
  destination: string;
  ratingNumber: number;
  bookers: ITourBooker[];
  tourGuides: ITourGuide[];
  createdAt: IDateValue;
  available: {
    startDate: IDateValue;
    endDate: IDateValue;
  };
};

export type TourItem = {
  _id: string;
  name: string;
  content: string;
  images: string[];
  tourGuides: ITourGuide[];
  available: {
    startDate: IDateValue;
    endDate: IDateValue;
  };
  durations: string;
  destination: string;
  services: string[];
  tags: string[];
  publish: boolean;
  price: number;
  salePrice: number;
  rating: number;
  createdAt: IDateValue;
};
