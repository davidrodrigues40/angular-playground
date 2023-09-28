import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactGeneratorComponent } from './fact-generator.component';

fdescribe('FactGeneratorComponent', () => {
    let component: FactGeneratorComponent;
    let fixture: ComponentFixture<FactGeneratorComponent>;
    let service: jasmine.SpyObj<ChuckNorrisFactStateService> = jasmine.createSpyObj('ChuckNorrisFactStateService', ['fetchFact$'], ['fact$']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FactGeneratorComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FactGeneratorComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
