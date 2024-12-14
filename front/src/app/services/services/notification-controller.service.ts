/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getUnreadNotifications } from '../fn/notification-controller/get-unread-notifications';
import { GetUnreadNotifications$Params } from '../fn/notification-controller/get-unread-notifications';
import { markAllNotificationsAsRead } from '../fn/notification-controller/mark-all-notifications-as-read';
import { MarkAllNotificationsAsRead$Params } from '../fn/notification-controller/mark-all-notifications-as-read';
import { markNotificationsAsRead } from '../fn/notification-controller/mark-notifications-as-read';
import { MarkNotificationsAsRead$Params } from '../fn/notification-controller/mark-notifications-as-read';
import { Notification } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class NotificationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `markNotificationsAsRead()` */
  static readonly MarkNotificationsAsReadPath = '/notificationss/notifications/markAsRead';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `markNotificationsAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  markNotificationsAsRead$Response(params: MarkNotificationsAsRead$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return markNotificationsAsRead(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `markNotificationsAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  markNotificationsAsRead(params: MarkNotificationsAsRead$Params, context?: HttpContext): Observable<void> {
    return this.markNotificationsAsRead$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `markAllNotificationsAsRead()` */
  static readonly MarkAllNotificationsAsReadPath = '/notificationss/markAllAsRead';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `markAllNotificationsAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAllNotificationsAsRead$Response(params?: MarkAllNotificationsAsRead$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return markAllNotificationsAsRead(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `markAllNotificationsAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAllNotificationsAsRead(params?: MarkAllNotificationsAsRead$Params, context?: HttpContext): Observable<void> {
    return this.markAllNotificationsAsRead$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getUnreadNotifications()` */
  static readonly GetUnreadNotificationsPath = '/notificationss/unread';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUnreadNotifications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnreadNotifications$Response(params?: GetUnreadNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Notification>>> {
    return getUnreadNotifications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUnreadNotifications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnreadNotifications(params?: GetUnreadNotifications$Params, context?: HttpContext): Observable<Array<Notification>> {
    return this.getUnreadNotifications$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Notification>>): Array<Notification> => r.body)
    );
  }

}
