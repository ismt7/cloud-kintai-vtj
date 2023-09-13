/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Rest = {
    /**
     * スタッフID
     */
    staff_id: number;
    /**
     * 出勤日
     */
    work_date: string;
    /**
     * 休憩開始時間
     */
    start_time?: (string | null);
    /**
     * 休憩終了時間
     */
    end_time?: (string | null);
    /**
     * 休憩ID
     */
    id: number;
    /**
     * 作成日時
     */
    created_at: string;
    /**
     * 更新日時
     */
    updated_at: (string | null);
    /**
     * 作成者
     */
    created_by: number;
    /**
     * 更新者
     */
    updated_by: (number | null);
};

