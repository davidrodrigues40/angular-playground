import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageDecoder, StorageService, StorageTranscoder } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(@Inject(SESSION_STORAGE) private _session: StorageService, @Inject(LOCAL_STORAGE) private _local: StorageService) { }

  setSession<T>(key: string, value: any, transcoder: StorageTranscoder<T>): void {
    this._session.set(key, value, transcoder);
  }

  getSession<T>(key: string, decoder: StorageDecoder<T>): any {
    return this._session.get(key, decoder);
  }

  setLocal<T>(key: string, value: any, transcoder: StorageTranscoder<T>): void {
    this._local.set(key, value, transcoder);
  }

  getLocal<T>(key: string, decoder: StorageDecoder<T>): any {
    return this._local.get(key, decoder);
  }
}
