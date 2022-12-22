export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors: Array<string>;
    };
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/