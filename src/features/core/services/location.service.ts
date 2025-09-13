import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface GeoNamesResult {
  geonames: { name: string; population: number }[];
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  private readonly url = 'http://api.geonames.org/searchJSON';
  private readonly username = 'hoofy';
  private http = inject(HttpClient);

  searchCities(term: string): Observable<string[]> {
    const q = term.trim();
    if (q.length < 2) {
      return of([]);
    }

    const params = new HttpParams()
      .set('name_startsWith', q)
      .set('country', 'PL')
      .set('featureClass', 'P')
      .set('maxRows', '10')
      .set('username', this.username)
      .set('lang', 'pl')
      .set('accept-language', 'pl');

    return this.http.get<GeoNamesResult>(this.url, { params }).pipe(
      map(r =>
        r.geonames.map(g => ({
          name: g.name.trim(),
          population: g.population || 0,
        }))
      ),
      // 2. Sortuj malejąco po populacji
      map(arr => arr.sort((a, b) => b.population - a.population)),
      // 3. Wyciągnij unikalne nazwy (kolejność zachowana po sortowaniu)
      map(arr => Array.from(new Map(arr.map(item => [item.name, item])).values())),
      // 4. Mapuj do tablicy stringów
      map(arr => arr.map(item => item.name))
    );
  }
}
