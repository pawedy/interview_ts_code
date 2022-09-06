import {CarQuestionnaireRepository} from "./main";

abstract class Entity {
    id: string;

    protected constructor(id: string) {
        this.id = id;
    }

    static loggingConstructor(...params: any): Entity {
        console.log('New entity created with params:');
        console.log(params);

        return self.constructor(...params);
    };
}

export class UserEntity extends Entity {
    name: string;
    age: number;

    constructor(id: string, name: string, age: number) {
        super(id);
        this.name = name;
        this.age = age;
    }

    // I don't need this here
    static loggingConstructor(..._: any[]): any { return; }
}

export class AnswersEntity extends Entity {
    car: string;
    engine: number;

    constructor(id: string, car: string, engine: number) {
        super(id);
        this.car = car;
        this.engine = engine;
    }

    // I don't need this here
    static loggingConstructor(..._: any[]): any { return; }
}

export class CarQuestionnaireEntity extends Entity {
    user: UserEntity;
    questions: AnswersEntity;

    constructor(id: string, user: UserEntity, questions: AnswersEntity) {
        super(id);
        this.user = user;
        this.questions = questions;
    }

    // I don't need this here
    static loggingConstructor(..._: any[]): any { return; }
}

export class CarQuestionnaireHandler {
    private repository: CarQuestionnaireRepository;

    constructor(repository: CarQuestionnaireRepository) {
        this.repository = repository;
    }

    submit(questionnaire: CarQuestionnaireEntity) : CarQuestionnaireResponse {
        this.repository.save(questionnaire)
        return this.analyzeAnswers(questionnaire.questions)
    }

    private analyzeAnswers(answers: AnswersEntity): CarQuestionnaireResponse {
        let engineComment = answers.engine.toString()

        // Many more engine types to come soon!!!
        switch(answers.engine) {
            case 1.0: {
                engineComment = engineComment + ' engine is so efficient!'
                break;
            }
            case 2.0: {
                engineComment = engineComment + ' engine is so powerful!'
                break;
            }
            default: {
                engineComment = engineComment + ' engine is so... average...';
                break;
            }
        }

        return new CarQuestionnaireResponse(
            answers.car + ' is an amazing car!',
            engineComment
        )
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
