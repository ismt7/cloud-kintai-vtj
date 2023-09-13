/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AttendanceCreate = {
    /**
     * スタッフID
     */
    staff_id: number;
    /**
     * 出勤日
     */
    work_date: string;
    /**
     * 出勤時間
     */
    start_time?: (string | null);
    /**
     * 退勤時間
     */
    end_time?: (string | null);
    /**
     * 直行フラグ
     */
    go_directly_flag?: boolean;
    /**
     * 直帰フラグ
     */
    return_directly_flag?: boolean;
    /**
     * 備考
     */
    remarks?: string;
};

