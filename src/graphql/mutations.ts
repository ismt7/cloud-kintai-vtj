/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHolidayCalendar = /* GraphQL */ `
  mutation CreateHolidayCalendar(
    $input: CreateHolidayCalendarInput!
    $condition: ModelHolidayCalendarConditionInput
  ) {
    createHolidayCalendar(input: $input, condition: $condition) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateHolidayCalendar = /* GraphQL */ `
  mutation UpdateHolidayCalendar(
    $input: UpdateHolidayCalendarInput!
    $condition: ModelHolidayCalendarConditionInput
  ) {
    updateHolidayCalendar(input: $input, condition: $condition) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteHolidayCalendar = /* GraphQL */ `
  mutation DeleteHolidayCalendar(
    $input: DeleteHolidayCalendarInput!
    $condition: ModelHolidayCalendarConditionInput
  ) {
    deleteHolidayCalendar(input: $input, condition: $condition) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCompanyHolidayCalendar = /* GraphQL */ `
  mutation CreateCompanyHolidayCalendar(
    $input: CreateCompanyHolidayCalendarInput!
    $condition: ModelCompanyHolidayCalendarConditionInput
  ) {
    createCompanyHolidayCalendar(input: $input, condition: $condition) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCompanyHolidayCalendar = /* GraphQL */ `
  mutation UpdateCompanyHolidayCalendar(
    $input: UpdateCompanyHolidayCalendarInput!
    $condition: ModelCompanyHolidayCalendarConditionInput
  ) {
    updateCompanyHolidayCalendar(input: $input, condition: $condition) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCompanyHolidayCalendar = /* GraphQL */ `
  mutation DeleteCompanyHolidayCalendar(
    $input: DeleteCompanyHolidayCalendarInput!
    $condition: ModelCompanyHolidayCalendarConditionInput
  ) {
    deleteCompanyHolidayCalendar(input: $input, condition: $condition) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCloseDate = /* GraphQL */ `
  mutation CreateCloseDate(
    $input: CreateCloseDateInput!
    $condition: ModelCloseDateConditionInput
  ) {
    createCloseDate(input: $input, condition: $condition) {
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
export const updateCloseDate = /* GraphQL */ `
  mutation UpdateCloseDate(
    $input: UpdateCloseDateInput!
    $condition: ModelCloseDateConditionInput
  ) {
    updateCloseDate(input: $input, condition: $condition) {
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
export const deleteCloseDate = /* GraphQL */ `
  mutation DeleteCloseDate(
    $input: DeleteCloseDateInput!
    $condition: ModelCloseDateConditionInput
  ) {
    deleteCloseDate(input: $input, condition: $condition) {
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
export const createAttendance = /* GraphQL */ `
  mutation CreateAttendance(
    $input: CreateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    createAttendance(input: $input, condition: $condition) {
      id
      staffId
      workDate
      startTime
      endTime
      goDirectlyFlag
      returnDirectlyFlag
      rests {
        startTime
        endTime
        __typename
      }
      remarks
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAttendance = /* GraphQL */ `
  mutation UpdateAttendance(
    $input: UpdateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    updateAttendance(input: $input, condition: $condition) {
      id
      staffId
      workDate
      startTime
      endTime
      goDirectlyFlag
      returnDirectlyFlag
      rests {
        startTime
        endTime
        __typename
      }
      remarks
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAttendance = /* GraphQL */ `
  mutation DeleteAttendance(
    $input: DeleteAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    deleteAttendance(input: $input, condition: $condition) {
      id
      staffId
      workDate
      startTime
      endTime
      goDirectlyFlag
      returnDirectlyFlag
      rests {
        startTime
        endTime
        __typename
      }
      remarks
      createdAt
      updatedAt
      __typename
    }
  }
`;
