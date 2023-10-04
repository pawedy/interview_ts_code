import { ENGINE_COMMENTS } from './constants';
import {
    CarQuestionnaireRepository,
    WorkshopCarQuestionnaireRepository,
} from './main';

abstract class Entity {
    id: string;

    protected constructor(id: string) {
        this.id = id;
    }
}

export class UserEntity extends Entity {
    name: string;
    age: number;

    constructor(id: string, name: string, age: number) {
        super(id);
        this.name = name;
        this.age = age;
    }
}

export class WorkshopEntity extends Entity {
    name: string;

    constructor(id: string, name: string) {
        super(id);
        this.name = name;
    }
}

export class AnswersEntity extends Entity {
    car: string;
    engine: number;

    constructor(id: string, car: string, engine: number) {
        super(id);
        this.car = car;
        this.engine = engine;
    }
}

export class WorkshopAnswersEntity extends AnswersEntity {
    reason: string;
    constructor(id: string, car: string, engine: number, reason: string) {
        super(id, car, engine);
        this.reason = reason;
    }
}

export class CarQuestionnaireEntity extends Entity {
    user: UserEntity;
    questions: AnswersEntity;

    constructor(id: string, user: UserEntity, questions: AnswersEntity) {
        super(id);
        this.user = user;
        this.questions = questions;
    }
}

export class WorkshopCarQuestionnaireEntity extends Entity {
    workshop: WorkshopEntity;
    questions: AnswersEntity;

    constructor(
        id: string,
        workshop: WorkshopEntity,
        questions: AnswersEntity
    ) {
        super(id);
        this.workshop = workshop;
        this.questions = questions;
    }
}

export class CarQuestionnaireHandler {
    private repository: CarQuestionnaireRepository;

    constructor(repository: CarQuestionnaireRepository) {
        this.repository = repository;
    }

    submit(questionnaire: CarQuestionnaireEntity): CarQuestionnaireResponse {
        this.repository.save(questionnaire);
        return this.analyzeAnswers(questionnaire.questions);
    }

    private analyzeAnswers(answers: AnswersEntity): CarQuestionnaireResponse {
        const carComment = `${answers.car} is an amazing car!`;
        const engineComment = this.generateEngineComment(answers.engine);

        return new CarQuestionnaireResponse(carComment, engineComment);
    }

    private generateEngineComment(engine: number): string {
        const defaultComment = 'engine is so... average...';

        return `${engine} ${ENGINE_COMMENTS[engine] ?? defaultComment}`;
    }
}

export class WorkshopCarQuestionnaireHandler {
    private repository: WorkshopCarQuestionnaireRepository;

    constructor(repository: WorkshopCarQuestionnaireRepository) {
        this.repository = repository;
    }

    submit(questionnaire: WorkshopCarQuestionnaireEntity): void {
        this.repository.save(questionnaire);
    }
}

export class CarQuestionnaireResponse {
    car: string;
    engine: string;

    constructor(car: string, engine: string) {
        this.car = car;
        this.engine = engine;
    }
}
