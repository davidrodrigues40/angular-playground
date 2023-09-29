import { TestBed } from '@angular/core/testing';
import { FrameService } from './frame.service';

describe('FrameService', () => {
  let service: FrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrameService]
    });
    service = TestBed.inject(FrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when getFrameValues invoked', () => {
    it('should return 2 numeric values', () => {
      const values: number[] = [1, 2];

      const actual: string[] = service.getFrameValues(values);

      expect(actual).toEqual(['1', '2']);
    });

    it('should return a strike', () => {
      const values: number[] = [10];

      const actual: string[] = service.getFrameValues(values);

      expect(actual).toEqual(['X', '']);
    });

    it('should return a spare', () => {
      const values: number[] = [5, 5];

      const actual: string[] = service.getFrameValues(values);

      expect(actual).toEqual(['5', '/']);
    });

    it('should return 3 values', () => {
      const values: number[] = [10, 10, 10];

      const actual: string[] = service.getFrameValues(values);

      expect(actual).toEqual(['X', 'X', 'X']);
    });
  });

  describe('when calculateFrameValue invoked', () => {
    it('should return score at index 0', () => {
      const actual = service.calculateFrameValue(10, 0, []);

      expect(actual).toEqual(10);
    });

    it('should return current score plus new score', () => {
      const frames = [{ score: 10, roles: new Map<number, number>() }, { score: 10, roles: new Map<number, number>() }];

      const actual = service.calculateFrameValue(10, 2, frames);

      expect(actual).toEqual(30);
    });
  });
});
