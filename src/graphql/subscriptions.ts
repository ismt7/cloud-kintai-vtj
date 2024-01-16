/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHolidayCalendar = /* GraphQL */ `
  subscription OnCreateHolidayCalendar(
    $filter: ModelSubscriptionHolidayCalendarFilterInput
  ) {
    onCreateHolidayCalendar(filter: $filter) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateHolidayCalendar = /* GraphQL */ `
  subscription OnUpdateHolidayCalendar(
    $filter: ModelSubscriptionHolidayCalendarFilterInput
  ) {
    onUpdateHolidayCalendar(filter: $filter) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteHolidayCalendar = /* GraphQL */ `
  subscription OnDeleteHolidayCalendar(
    $filter: ModelSubscriptionHolidayCalendarFilterInput
  ) {
    onDeleteHolidayCalendar(filter: $filter) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCompanyHolidayCalendar = /* GraphQL */ `
  subscription OnCreateCompanyHolidayCalendar(
    $filter: ModelSubscriptionCompanyHolidayCalendarFilterInput
  ) {
    onCreateCompanyHolidayCalendar(filter: $filter) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCompanyHolidayCalendar = /* GraphQL */ `
  subscription OnUpdateCompanyHolidayCalendar(
    $filter: ModelSubscriptionCompanyHolidayCalendarFilterInput
  ) {
    onUpdateCompanyHolidayCalendar(filter: $filter) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCompanyHolidayCalendar = /* GraphQL */ `
  subscription OnDeleteCompanyHolidayCalendar(
    $filter: ModelSubscriptionCompanyHolidayCalendarFilterInput
  ) {
    onDeleteCompanyHolidayCalendar(filter: $filter) {
      id
      holidayDate
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCloseDate = /* GraphQL */ `
  subscription OnCreateCloseDate(
    $filter: ModelSubscriptionCloseDateFilterInput
  ) {
    onCreateCloseDate(filter: $filter) {
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
export const onUpdateCloseDate = /* GraphQL */ `
  subscription OnUpdateCloseDate(
    $filter: ModelSubscriptionCloseDateFilterInput
  ) {
    onUpdateCloseDate(filter: $filter) {
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
export const onDeleteCloseDate = /* GraphQL */ `
  subscription OnDeleteCloseDate(
    $filter: ModelSubscriptionCloseDateFilterInput
  ) {
    onDeleteCloseDate(filter: $filter) {
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
export const onCreateAttendance = /* GraphQL */ `
  subscription OnCreateAttendance(
    $filter: ModelSubscriptionAttendanceFilterInput
  ) {
    onCreateAttendance(filter: $filter) {
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
      paidHolidayFlag
      histories {
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
        paidHolidayFlag
        createdAt
        __typename
      }
      revision
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAttendance = /* GraphQL */ `
  subscription OnUpdateAttendance(
    $filter: ModelSubscriptionAttendanceFilterInput
  ) {
    onUpdateAttendance(filter: $filter) {
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
      paidHolidayFlag
      histories {
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
        paidHolidayFlag
        createdAt
        __typename
      }
      revision
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAttendance = /* GraphQL */ `
  subscription OnDeleteAttendance(
    $filter: ModelSubscriptionAttendanceFilterInput
  ) {
    onDeleteAttendance(filter: $filter) {
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
      paidHolidayFlag
      histories {
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
        paidHolidayFlag
        createdAt
        __typename
      }
      revision
      createdAt
      updatedAt
      __typename
    }
  }
`;
