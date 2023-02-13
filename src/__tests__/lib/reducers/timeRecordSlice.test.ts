import { cleanup } from "@testing-library/react";
import timeRecordReducer, {
  TimeRecordState,
  TimeRecordStatus,
  TimeRecordStatusText,
} from "../../../lib/reducers/timeRecordSlice";
import getTimeRecordStatus from "../../../lib/time_record/getTimeRecordStatus";

const initialState: TimeRecordState = {
  status: TimeRecordStatus.BEFORE_WORK,
  statusText: TimeRecordStatusText.BEFORE_WORK,
};

const statuses = [
  TimeRecordStatus.PROCESSING,
  TimeRecordStatus.BEFORE_WORK,
  TimeRecordStatus.WORKING,
  TimeRecordStatus.RESTING,
  TimeRecordStatus.LEFT_WORK,
  TimeRecordStatus.ERROR,
];

afterEach(() => {
  cleanup();
});

describe("pending", () => {
  test.concurrent.each(statuses)("%s", (status) => {
    expect(
      timeRecordReducer(initialState, {
        type: getTimeRecordStatus.pending.type,
        payload: status,
      })
    ).toEqual({
      status: TimeRecordStatus.PROCESSING,
      statusText: TimeRecordStatusText.PROCESSING,
    });
  });
});

describe("fulfilled", () => {
  test.concurrent.each(statuses)("%s", (status) => {
    expect(
      timeRecordReducer(initialState, {
        type: getTimeRecordStatus.fulfilled.type,
        payload: status,
      })
    ).toEqual({
      status,
      statusText: TimeRecordStatusText[status],
    });
  });
});

describe("rejected", () => {
  test.concurrent.each(statuses)("%s", (status) => {
    expect(
      timeRecordReducer(initialState, {
        type: getTimeRecordStatus.rejected.type,
        payload: status,
      })
    ).toEqual({
      status: TimeRecordStatus.ERROR,
      statusText: TimeRecordStatusText.ERROR,
    });
  });
});
