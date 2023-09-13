/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Attendance } from '../models/Attendance';
import type { AttendanceCreate } from '../models/AttendanceCreate';
import type { Rest } from '../models/Rest';
import type { RestCreate } from '../models/RestCreate';
import type { Role } from '../models/Role';
import type { RoleCreate } from '../models/RoleCreate';
import type { Staff } from '../models/Staff';
import type { StaffCreate } from '../models/StaffCreate';
import type { StaffRole } from '../models/StaffRole';
import type { StaffRoleCreate } from '../models/StaffRoleCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class Service {

    /**
     * 出退勤情報の作成
     * 出退勤情報を作成します。
     * @param requestBody
     * @param xUserId
     * @returns Attendance Successful Response
     * @throws ApiError
     */
    public static createAttendanceAttendancePost(
        requestBody: AttendanceCreate,
        xUserId?: number,
    ): CancelablePromise<Attendance> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/attendance',
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 出退勤情報の取得
     * @param attendanceId
     * @param xUserId
     * @returns Attendance Successful Response
     * @throws ApiError
     */
    public static getAttendanceAttendanceAttendanceIdGet(
        attendanceId: number,
        xUserId?: number,
    ): CancelablePromise<Attendance> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/attendance/{attendance_id}',
            path: {
                'attendance_id': attendanceId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 出退勤情報の更新
     * 出勤情報の更新を行います。
     * @param attendanceId
     * @param requestBody
     * @param xUserId
     * @returns Attendance Successful Response
     * @throws ApiError
     */
    public static updateAttendanceAttendanceAttendanceIdPut(
        attendanceId: number,
        requestBody: AttendanceCreate,
        xUserId?: number,
    ): CancelablePromise<Attendance> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/attendance/{attendance_id}',
            path: {
                'attendance_id': attendanceId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 出退勤情報の削除
     * @param attendanceId
     * @param xUserId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteAttendanceAttendanceAttendanceIdDelete(
        attendanceId: number,
        xUserId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/attendance/{attendance_id}',
            path: {
                'attendance_id': attendanceId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 出退勤情報の一覧取得
     * @returns Attendance Successful Response
     * @throws ApiError
     */
    public static getAttendancesAttendancesGet(): CancelablePromise<Array<Attendance>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/attendances',
        });
    }

    /**
     * スタッフの出退勤情報取得
     * スタッフの出退勤情報を取得します
     * @param staffId
     * @param fromDate
     * @param toDate
     * @returns Attendance Successful Response
     * @throws ApiError
     */
    public static getAttendancesByStaffIdStaffStaffIdFromDateToDateAttendancesGet(
        staffId: number,
        fromDate: string,
        toDate: string,
    ): CancelablePromise<Array<Attendance>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/staff/{staff_id}/{from_date}/{to_date}/attendances',
            path: {
                'staff_id': staffId,
                'from_date': fromDate,
                'to_date': toDate,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 休憩情報の作成
     * 休憩情報を作成します。
     * @param requestBody
     * @param xUserId
     * @returns Rest Successful Response
     * @throws ApiError
     */
    public static createRestRestPost(
        requestBody: RestCreate,
        xUserId?: number,
    ): CancelablePromise<Rest> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest',
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 休憩情報の取得
     * @param restId
     * @param xUserId
     * @returns Rest Successful Response
     * @throws ApiError
     */
    public static getRestRestRestIdGet(
        restId: number,
        xUserId?: number,
    ): CancelablePromise<Rest> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/{rest_id}',
            path: {
                'rest_id': restId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 休憩情報の更新
     * 休憩情報を更新します。
     * @param restId
     * @param requestBody
     * @param xUserId
     * @returns Rest Successful Response
     * @throws ApiError
     */
    public static updateRestRestRestIdPut(
        restId: number,
        requestBody: RestCreate,
        xUserId?: number,
    ): CancelablePromise<Rest> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/rest/{rest_id}',
            path: {
                'rest_id': restId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 休憩情報の削除
     * @param restId
     * @param xUserId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteRestRestRestIdDelete(
        restId: number,
        xUserId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/rest/{rest_id}',
            path: {
                'rest_id': restId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 休憩情報の一覧取得
     * @param xUserId
     * @returns Rest Successful Response
     * @throws ApiError
     */
    public static getRestsRestsGet(
        xUserId?: number,
    ): CancelablePromise<Array<Rest>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rests',
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフの作成
     * スタッフを作成します
     * @param requestBody
     * @param xUserId
     * @returns Staff Successful Response
     * @throws ApiError
     */
    public static createStaffStaffPost(
        requestBody: StaffCreate,
        xUserId?: number,
    ): CancelablePromise<Staff> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/staff',
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフの取得
     * スタッフを取得します
     * @param staffId
     * @param xUserId
     * @returns Staff Successful Response
     * @throws ApiError
     */
    public static getStaffStaffStaffIdGet(
        staffId: number,
        xUserId?: number,
    ): CancelablePromise<Staff> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/staff/{staff_id}',
            path: {
                'staff_id': staffId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフの更新
     * スタッフを更新します
     * @param staffId
     * @param requestBody
     * @param xUserId
     * @returns Staff Successful Response
     * @throws ApiError
     */
    public static updateStaffStaffStaffIdPut(
        staffId: number,
        requestBody: StaffCreate,
        xUserId?: number,
    ): CancelablePromise<Staff> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/staff/{staff_id}',
            path: {
                'staff_id': staffId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフの削除
     * スタッフを削除します
     * @param staffId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteStaffStaffStaffIdDelete(
        staffId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/staff/{staff_id}',
            path: {
                'staff_id': staffId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフの一覧取得
     * @param xUserId
     * @returns Staff Successful Response
     * @throws ApiError
     */
    public static getStaffsStaffsGet(
        xUserId?: number,
    ): CancelablePromise<Array<Staff>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/staffs',
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフ権限の登録
     * スタッフ権限を登録します
     * @param requestBody
     * @param xUserId
     * @returns StaffRole Successful Response
     * @throws ApiError
     */
    public static createStaffRoleStaffRolePost(
        requestBody: StaffRoleCreate,
        xUserId?: number,
    ): CancelablePromise<StaffRole> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/staff/role',
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフ権限の取得
     * スタッフ権限を取得します
     * @param staffRoleId
     * @param xUserId
     * @returns StaffRole Successful Response
     * @throws ApiError
     */
    public static getStaffRoleStaffRoleStaffRoleIdGet(
        staffRoleId: number,
        xUserId?: number,
    ): CancelablePromise<StaffRole> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/staff/role/{staff_role_id}',
            path: {
                'staff_role_id': staffRoleId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフ権限の一覧取得
     * スタッフ権限の一覧を取得します
     * @param xUserId
     * @returns StaffRole Successful Response
     * @throws ApiError
     */
    public static getStaffRolesStaffsRoleGet(
        xUserId?: number,
    ): CancelablePromise<Array<StaffRole>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/staffs/role',
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフ権限の更新
     * スタッフ権限を更新します
     * @param staffId
     * @param requestBody
     * @param xUserId
     * @returns StaffRole Successful Response
     * @throws ApiError
     */
    public static updateStaffRoleStaffRoleStaffIdPut(
        staffId: number,
        requestBody: StaffRoleCreate,
        xUserId?: number,
    ): CancelablePromise<StaffRole> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/staff/role/{staff_id}',
            path: {
                'staff_id': staffId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * スタッフ権限の削除
     * スタッフ権限を削除します
     * @param staffId
     * @param xUserId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteStaffRoleStaffRoleStaffIdDelete(
        staffId: number,
        xUserId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/staff/role/{staff_id}',
            path: {
                'staff_id': staffId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 権限の作成
     * 権限を作成します
     * @param requestBody
     * @param xUserId
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static createRoleRolePost(
        requestBody: RoleCreate,
        xUserId?: number,
    ): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/role',
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 権限の取得
     * 権限を取得します
     * @param roleId
     * @param xUserId
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static getRoleRoleRoleIdGet(
        roleId: number,
        xUserId?: number,
    ): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/role/{role_id}',
            path: {
                'role_id': roleId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 権限の更新
     * 権限を更新します
     * @param roleId
     * @param requestBody
     * @param xUserId
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static updateRoleRoleRoleIdPut(
        roleId: number,
        requestBody: RoleCreate,
        xUserId?: number,
    ): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/role/{role_id}',
            path: {
                'role_id': roleId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 権限の削除
     * 権限を削除します
     * @param roleId
     * @param xUserId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteRoleRoleRoleIdDelete(
        roleId: number,
        xUserId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/role/{role_id}',
            path: {
                'role_id': roleId,
            },
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * 権限の一覧取得
     * 権限の一覧取得します
     * @param xUserId
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static getRolesRolesGet(
        xUserId?: number,
    ): CancelablePromise<Array<Role>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/roles',
            headers: {
                'x-user-id': xUserId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
