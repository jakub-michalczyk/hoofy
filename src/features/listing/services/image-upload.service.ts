import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { filter, lastValueFrom, map, Observable } from 'rxjs';

export interface ICloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id?: string;
  signature?: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag?: string;
  placeholder?: boolean;
  url?: string;
  secure_url?: string;
  original_filename?: string;
}

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  private cloudName = 'dsr91nqn7';
  private uploadPreset = 'listing_images';
  private baseUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
  private http = inject(HttpClient);

  async uploadFile(file: File, folder?: string): Promise<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', this.uploadPreset);
    if (folder) form.append('folder', folder);

    const req$ = this.http.post<ICloudinaryResponse>(this.baseUrl, form);
    const res = await lastValueFrom(req$);
    const url = res.secure_url ?? res.url;
    if (!url) throw new Error('Cloudinary upload returned no URL');
    return url;
  }

  uploadFileWithProgress(file: File, folder?: string): Observable<number | string> {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', this.uploadPreset);
    if (folder) form.append('folder', folder);

    const req = new HttpRequest('POST', this.baseUrl, form, {
      reportProgress: true,
    });

    return this.http.request<ICloudinaryResponse>(req).pipe(
      filter(
        (evt: HttpEvent<ICloudinaryResponse>) =>
          evt.type === HttpEventType.UploadProgress || evt.type === HttpEventType.Response
      ),
      map(evt => {
        if (evt.type === HttpEventType.UploadProgress) {
          const percent = evt.total ? Math.round((100 * evt.loaded) / evt.total) : 0;
          return percent;
        } else {
          const resp = evt as HttpResponse<ICloudinaryResponse>;
          const body = resp.body;
          return body?.secure_url ?? body?.url ?? '';
        }
      })
    );
  }

  async uploadFiles(files: File[], folder?: string, concurrency = 3): Promise<string[]> {
    const urls: string[] = new Array(files.length);
    const queue: Promise<void>[] = [];
    let index = 0;

    const worker = async (): Promise<void> => {
      while (index < files.length) {
        const i = index++;
        const file = files[i];
        const url = await this.uploadFile(file, folder);
        urls[i] = url;
      }
    };

    for (let i = 0; i < Math.min(concurrency, files.length); i++) {
      queue.push(worker());
    }

    await Promise.all(queue);
    return urls;
  }
}
