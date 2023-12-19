/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateHolidayCalendarInput = {
  id?: string | null,
  holidayDate: string,
  name: string,
};

export type ModelHolidayCalendarConditionInput = {
  holidayDate?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelHolidayCalendarConditionInput | null > | null,
  or?: Array< ModelHolidayCalendarConditionInput | null > | null,
  not?: ModelHolidayCalendarConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type HolidayCalendar = {
  __typename: "HolidayCalendar",
  id: string,
  holidayDate: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateHolidayCalendarInput = {
  id: string,
  holidayDate?: string | null,
  name?: string | null,
};

export type DeleteHolidayCalendarInput = {
  id: string,
};

export type CreateCompanyHolidayCalendarInput = {
  id?: string | null,
  holidayDate: string,
  name: string,
};

export type ModelCompanyHolidayCalendarConditionInput = {
  holidayDate?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCompanyHolidayCalendarConditionInput | null > | null,
  or?: Array< ModelCompanyHolidayCalendarConditionInput | null > | null,
  not?: ModelCompanyHolidayCalendarConditionInput | null,
};

export type CompanyHolidayCalendar = {
  __typename: "CompanyHolidayCalendar",
  id: string,
  holidayDate: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCompanyHolidayCalendarInput = {
  id: string,
  holidayDate?: string | null,
  name?: string | null,
};

export type DeleteCompanyHolidayCalendarInput = {
  id: string,
};

export type CreateCloseDateInput = {
  id?: string | null,
  closeDate: string,
  startDate: string,
  endDate: string,
};

export type ModelCloseDateConditionInput = {
  closeDate?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  and?: Array< ModelCloseDateConditionInput | null > | null,
  or?: Array< ModelCloseDateConditionInput | null > | null,
  not?: ModelCloseDateConditionInput | null,
};

export type CloseDate = {
  __typename: "CloseDate",
  id: string,
  closeDate: string,
  startDate: string,
  endDate: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCloseDateInput = {
  id: string,
  closeDate?: string | null,
  startDate?: string | null,
  endDate?: string | null,
};

export type DeleteCloseDateInput = {
  id: string,
};

export type CreateAttendanceInput = {
  id?: string | null,
  staffId: string,
  workDate: string,
  startTime?: string | null,
  endTime?: string | null,
  goDirectlyFlag?: boolean | null,
  returnDirectlyFlag?: boolean | null,
  rests?: Array< RestInput | null > | null,
  remarks?: string | null,
  paidHolidayFlag?: boolean | null,
};

export type RestInput = {
  startTime?: string | null,
  endTime?: string | null,
};

export type ModelAttendanceConditionInput = {
  staffId?: ModelStringInput | null,
  workDate?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  goDirectlyFlag?: ModelBooleanInput | null,
  returnDirectlyFlag?: ModelBooleanInput | null,
  remarks?: ModelStringInput | null,
  paidHolidayFlag?: ModelBooleanInput | null,
  and?: Array< ModelAttendanceConditionInput | null > | null,
  or?: Array< ModelAttendanceConditionInput | null > | null,
  not?: ModelAttendanceConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Attendance = {
  __typename: "Attendance",
  id: string,
  staffId: string,
  workDate: string,
  startTime?: string | null,
  endTime?: string | null,
  goDirectlyFlag?: boolean | null,
  returnDirectlyFlag?: boolean | null,
  rests?:  Array<Rest | null > | null,
  remarks?: string | null,
  paidHolidayFlag?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type Rest = {
  __typename: "Rest",
  startTime?: string | null,
  endTime?: string | null,
};

export type UpdateAttendanceInput = {
  id: string,
  staffId?: string | null,
  workDate?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  goDirectlyFlag?: boolean | null,
  returnDirectlyFlag?: boolean | null,
  rests?: Array< RestInput | null > | null,
  remarks?: string | null,
  paidHolidayFlag?: boolean | null,
};

export type DeleteAttendanceInput = {
  id: string,
};

export type ModelHolidayCalendarFilterInput = {
  id?: ModelIDInput | null,
  holidayDate?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelHolidayCalendarFilterInput | null > | null,
  or?: Array< ModelHolidayCalendarFilterInput | null > | null,
  not?: ModelHolidayCalendarFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelHolidayCalendarConnection = {
  __typename: "ModelHolidayCalendarConnection",
  items:  Array<HolidayCalendar | null >,
  nextToken?: string | null,
};

export type ModelCompanyHolidayCalendarFilterInput = {
  id?: ModelIDInput | null,
  holidayDate?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCompanyHolidayCalendarFilterInput | null > | null,
  or?: Array< ModelCompanyHolidayCalendarFilterInput | null > | null,
  not?: ModelCompanyHolidayCalendarFilterInput | null,
};

export type ModelCompanyHolidayCalendarConnection = {
  __typename: "ModelCompanyHolidayCalendarConnection",
  items:  Array<CompanyHolidayCalendar | null >,
  nextToken?: string | null,
};

export type ModelCloseDateFilterInput = {
  id?: ModelIDInput | null,
  closeDate?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  and?: Array< ModelCloseDateFilterInput | null > | null,
  or?: Array< ModelCloseDateFilterInput | null > | null,
  not?: ModelCloseDateFilterInput | null,
};

export type ModelCloseDateConnection = {
  __typename: "ModelCloseDateConnection",
  items:  Array<CloseDate | null >,
  nextToken?: string | null,
};

export type ModelAttendanceFilterInput = {
  id?: ModelIDInput | null,
  staffId?: ModelStringInput | null,
  workDate?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  goDirectlyFlag?: ModelBooleanInput | null,
  returnDirectlyFlag?: ModelBooleanInput | null,
  remarks?: ModelStringInput | null,
  paidHolidayFlag?: ModelBooleanInput | null,
  and?: Array< ModelAttendanceFilterInput | null > | null,
  or?: Array< ModelAttendanceFilterInput | null > | null,
  not?: ModelAttendanceFilterInput | null,
};

export type ModelAttendanceConnection = {
  __typename: "ModelAttendanceConnection",
  items:  Array<Attendance | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionHolidayCalendarFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  holidayDate?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionHolidayCalendarFilterInput | null > | null,
  or?: Array< ModelSubscriptionHolidayCalendarFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCompanyHolidayCalendarFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  holidayDate?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCompanyHolidayCalendarFilterInput | null > | null,
  or?: Array< ModelSubscriptionCompanyHolidayCalendarFilterInput | null > | null,
};

export type ModelSubscriptionCloseDateFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  closeDate?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCloseDateFilterInput | null > | null,
  or?: Array< ModelSubscriptionCloseDateFilterInput | null > | null,
};

export type ModelSubscriptionAttendanceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  staffId?: ModelSubscriptionStringInput | null,
  workDate?: ModelSubscriptionStringInput | null,
  startTime?: ModelSubscriptionStringInput | null,
  endTime?: ModelSubscriptionStringInput | null,
  goDirectlyFlag?: ModelSubscriptionBooleanInput | null,
  returnDirectlyFlag?: ModelSubscriptionBooleanInput | null,
  remarks?: ModelSubscriptionStringInput | null,
  paidHolidayFlag?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionAttendanceFilterInput | null > | null,
  or?: Array< ModelSubscriptionAttendanceFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateHolidayCalendarMutationVariables = {
  input: CreateHolidayCalendarInput,
  condition?: ModelHolidayCalendarConditionInput | null,
};

export type CreateHolidayCalendarMutation = {
  createHolidayCalendar?:  {
    __typename: "HolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHolidayCalendarMutationVariables = {
  input: UpdateHolidayCalendarInput,
  condition?: ModelHolidayCalendarConditionInput | null,
};

export type UpdateHolidayCalendarMutation = {
  updateHolidayCalendar?:  {
    __typename: "HolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHolidayCalendarMutationVariables = {
  input: DeleteHolidayCalendarInput,
  condition?: ModelHolidayCalendarConditionInput | null,
};

export type DeleteHolidayCalendarMutation = {
  deleteHolidayCalendar?:  {
    __typename: "HolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCompanyHolidayCalendarMutationVariables = {
  input: CreateCompanyHolidayCalendarInput,
  condition?: ModelCompanyHolidayCalendarConditionInput | null,
};

export type CreateCompanyHolidayCalendarMutation = {
  createCompanyHolidayCalendar?:  {
    __typename: "CompanyHolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCompanyHolidayCalendarMutationVariables = {
  input: UpdateCompanyHolidayCalendarInput,
  condition?: ModelCompanyHolidayCalendarConditionInput | null,
};

export type UpdateCompanyHolidayCalendarMutation = {
  updateCompanyHolidayCalendar?:  {
    __typename: "CompanyHolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCompanyHolidayCalendarMutationVariables = {
  input: DeleteCompanyHolidayCalendarInput,
  condition?: ModelCompanyHolidayCalendarConditionInput | null,
};

export type DeleteCompanyHolidayCalendarMutation = {
  deleteCompanyHolidayCalendar?:  {
    __typename: "CompanyHolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCloseDateMutationVariables = {
  input: CreateCloseDateInput,
  condition?: ModelCloseDateConditionInput | null,
};

export type CreateCloseDateMutation = {
  createCloseDate?:  {
    __typename: "CloseDate",
    id: string,
    closeDate: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCloseDateMutationVariables = {
  input: UpdateCloseDateInput,
  condition?: ModelCloseDateConditionInput | null,
};

export type UpdateCloseDateMutation = {
  updateCloseDate?:  {
    __typename: "CloseDate",
    id: string,
    closeDate: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCloseDateMutationVariables = {
  input: DeleteCloseDateInput,
  condition?: ModelCloseDateConditionInput | null,
};

export type DeleteCloseDateMutation = {
  deleteCloseDate?:  {
    __typename: "CloseDate",
    id: string,
    closeDate: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAttendanceMutationVariables = {
  input: CreateAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type CreateAttendanceMutation = {
  createAttendance?:  {
    __typename: "Attendance",
    id: string,
    staffId: string,
    workDate: string,
    startTime?: string | null,
    endTime?: string | null,
    goDirectlyFlag?: boolean | null,
    returnDirectlyFlag?: boolean | null,
    rests?:  Array< {
      __typename: "Rest",
      startTime?: string | null,
      endTime?: string | null,
    } | null > | null,
    remarks?: string | null,
    paidHolidayFlag?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAttendanceMutationVariables = {
  input: UpdateAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type UpdateAttendanceMutation = {
  updateAttendance?:  {
    __typename: "Attendance",
    id: string,
    staffId: string,
    workDate: string,
    startTime?: string | null,
    endTime?: string | null,
    goDirectlyFlag?: boolean | null,
    returnDirectlyFlag?: boolean | null,
    rests?:  Array< {
      __typename: "Rest",
      startTime?: string | null,
      endTime?: string | null,
    } | null > | null,
    remarks?: string | null,
    paidHolidayFlag?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAttendanceMutationVariables = {
  input: DeleteAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type DeleteAttendanceMutation = {
  deleteAttendance?:  {
    __typename: "Attendance",
    id: string,
    staffId: string,
    workDate: string,
    startTime?: string | null,
    endTime?: string | null,
    goDirectlyFlag?: boolean | null,
    returnDirectlyFlag?: boolean | null,
    rests?:  Array< {
      __typename: "Rest",
      startTime?: string | null,
      endTime?: string | null,
    } | null > | null,
    remarks?: string | null,
    paidHolidayFlag?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetHolidayCalendarQueryVariables = {
  id: string,
};

export type GetHolidayCalendarQuery = {
  getHolidayCalendar?:  {
    __typename: "HolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHolidayCalendarsQueryVariables = {
  filter?: ModelHolidayCalendarFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHolidayCalendarsQuery = {
  listHolidayCalendars?:  {
    __typename: "ModelHolidayCalendarConnection",
    items:  Array< {
      __typename: "HolidayCalendar",
      id: string,
      holidayDate: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCompanyHolidayCalendarQueryVariables = {
  id: string,
};

export type GetCompanyHolidayCalendarQuery = {
  getCompanyHolidayCalendar?:  {
    __typename: "CompanyHolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCompanyHolidayCalendarsQueryVariables = {
  filter?: ModelCompanyHolidayCalendarFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanyHolidayCalendarsQuery = {
  listCompanyHolidayCalendars?:  {
    __typename: "ModelCompanyHolidayCalendarConnection",
    items:  Array< {
      __typename: "CompanyHolidayCalendar",
      id: string,
      holidayDate: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCloseDateQueryVariables = {
  id: string,
};

export type GetCloseDateQuery = {
  getCloseDate?:  {
    __typename: "CloseDate",
    id: string,
    closeDate: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCloseDatesQueryVariables = {
  filter?: ModelCloseDateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCloseDatesQuery = {
  listCloseDates?:  {
    __typename: "ModelCloseDateConnection",
    items:  Array< {
      __typename: "CloseDate",
      id: string,
      closeDate: string,
      startDate: string,
      endDate: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAttendanceQueryVariables = {
  id: string,
};

export type GetAttendanceQuery = {
  getAttendance?:  {
    __typename: "Attendance",
    id: string,
    staffId: string,
    workDate: string,
    startTime?: string | null,
    endTime?: string | null,
    goDirectlyFlag?: boolean | null,
    returnDirectlyFlag?: boolean | null,
    rests?:  Array< {
      __typename: "Rest",
      startTime?: string | null,
      endTime?: string | null,
    } | null > | null,
    remarks?: string | null,
    paidHolidayFlag?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAttendancesQueryVariables = {
  filter?: ModelAttendanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttendancesQuery = {
  listAttendances?:  {
    __typename: "ModelAttendanceConnection",
    items:  Array< {
      __typename: "Attendance",
      id: string,
      staffId: string,
      workDate: string,
      startTime?: string | null,
      endTime?: string | null,
      goDirectlyFlag?: boolean | null,
      returnDirectlyFlag?: boolean | null,
      rests?:  Array< {
        __typename: "Rest",
        startTime?: string | null,
        endTime?: string | null,
      } | null > | null,
      remarks?: string | null,
      paidHolidayFlag?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateHolidayCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionHolidayCalendarFilterInput | null,
};

export type OnCreateHolidayCalendarSubscription = {
  onCreateHolidayCalendar?:  {
    __typename: "HolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHolidayCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionHolidayCalendarFilterInput | null,
};

export type OnUpdateHolidayCalendarSubscription = {
  onUpdateHolidayCalendar?:  {
    __typename: "HolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHolidayCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionHolidayCalendarFilterInput | null,
};

export type OnDeleteHolidayCalendarSubscription = {
  onDeleteHolidayCalendar?:  {
    __typename: "HolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCompanyHolidayCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionCompanyHolidayCalendarFilterInput | null,
};

export type OnCreateCompanyHolidayCalendarSubscription = {
  onCreateCompanyHolidayCalendar?:  {
    __typename: "CompanyHolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompanyHolidayCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionCompanyHolidayCalendarFilterInput | null,
};

export type OnUpdateCompanyHolidayCalendarSubscription = {
  onUpdateCompanyHolidayCalendar?:  {
    __typename: "CompanyHolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompanyHolidayCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionCompanyHolidayCalendarFilterInput | null,
};

export type OnDeleteCompanyHolidayCalendarSubscription = {
  onDeleteCompanyHolidayCalendar?:  {
    __typename: "CompanyHolidayCalendar",
    id: string,
    holidayDate: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCloseDateSubscriptionVariables = {
  filter?: ModelSubscriptionCloseDateFilterInput | null,
};

export type OnCreateCloseDateSubscription = {
  onCreateCloseDate?:  {
    __typename: "CloseDate",
    id: string,
    closeDate: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCloseDateSubscriptionVariables = {
  filter?: ModelSubscriptionCloseDateFilterInput | null,
};

export type OnUpdateCloseDateSubscription = {
  onUpdateCloseDate?:  {
    __typename: "CloseDate",
    id: string,
    closeDate: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCloseDateSubscriptionVariables = {
  filter?: ModelSubscriptionCloseDateFilterInput | null,
};

export type OnDeleteCloseDateSubscription = {
  onDeleteCloseDate?:  {
    __typename: "CloseDate",
    id: string,
    closeDate: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionAttendanceFilterInput | null,
};

export type OnCreateAttendanceSubscription = {
  onCreateAttendance?:  {
    __typename: "Attendance",
    id: string,
    staffId: string,
    workDate: string,
    startTime?: string | null,
    endTime?: string | null,
    goDirectlyFlag?: boolean | null,
    returnDirectlyFlag?: boolean | null,
    rests?:  Array< {
      __typename: "Rest",
      startTime?: string | null,
      endTime?: string | null,
    } | null > | null,
    remarks?: string | null,
    paidHolidayFlag?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionAttendanceFilterInput | null,
};

export type OnUpdateAttendanceSubscription = {
  onUpdateAttendance?:  {
    __typename: "Attendance",
    id: string,
    staffId: string,
    workDate: string,
    startTime?: string | null,
    endTime?: string | null,
    goDirectlyFlag?: boolean | null,
    returnDirectlyFlag?: boolean | null,
    rests?:  Array< {
      __typename: "Rest",
      startTime?: string | null,
      endTime?: string | null,
    } | null > | null,
    remarks?: string | null,
    paidHolidayFlag?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionAttendanceFilterInput | null,
};

export type OnDeleteAttendanceSubscription = {
  onDeleteAttendance?:  {
    __typename: "Attendance",
    id: string,
    staffId: string,
    workDate: string,
    startTime?: string | null,
    endTime?: string | null,
    goDirectlyFlag?: boolean | null,
    returnDirectlyFlag?: boolean | null,
    rests?:  Array< {
      __typename: "Rest",
      startTime?: string | null,
      endTime?: string | null,
    } | null > | null,
    remarks?: string | null,
    paidHolidayFlag?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
