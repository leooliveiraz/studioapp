import { TestBed } from '@angular/core/testing';
import { ProfissionalService } from '../services/profissional.service';


describe('ProfissionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfissionalService = TestBed.get(ProfissionalService);
    expect(service).toBeTruthy();
  });
});
