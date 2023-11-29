/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHolidayCalendar = /* GraphQL */ `
  query GetHolidayCalendar($id: ID!) {
    getHolidayCalendar(id: $id) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listHolidayCalendars = /* GraphQL */ `
  query ListHolidayCalendars(
    $filter: ModelHolidayCalendarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHolidayCalendars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        holidayDate
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCompanyHolidayCalendar = /* GraphQL */ `
  query GetCompanyHolidayCalendar($id: ID!) {
    getCompanyHolidayCalendar(id: $id) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCompanyHolidayCalendars = /* GraphQL */ `
  query ListCompanyHolidayCalendars(
    $filter: ModelCompanyHolidayCalendarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanyHolidayCalendars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        holidayDate
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCloseDate = /* GraphQL */ `
  query GetCloseDate($id: ID!) {
    getCloseDate(id: $id) {
      id
      closeDate
      startDate
      endDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCloseDates = /* GraphQL */ `
  query ListCloseDates(
    $filter: ModelCloseDateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCloseDates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        closeDate
        startDate
        endDate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
