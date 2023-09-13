/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Staff = {
    /**
     * 名前(姓)
     */
    last_name: string;
    /**
     * 名前(名)
     */
    first_name: string;
    /**
     * メールアドレス
     */
    mail_address: string;
    /**
     * アイコンの格納場所
     */
    icon_path?: (string | null);
    /**
     * スタッフID
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

