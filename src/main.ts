import { v4 as uuidv4 } from 'uuid';

import {
    AnswersEntity,
    CarQuestionnaireEntity,
    CarQuestionnaireHandler,
    CarQuestionnaireResponse,
    UserEntity,
    WorkshopAnswersEntity,
    WorkshopCarQuestionnaireEntity,
    WorkshopCarQuestionnaireHandler,
    WorkshopEntity,
} from './domain';
import { WorkshopAnswers } from './models';

// [SI] This is the first class in our applications slice that receives the user data
// it's being called by a framework that we use and that framework expects an HTML formatted string in return

export class Controller {
    public submitCarQuestionnaire(userInput: any): string {
        const user = new UserEntity(uuidv4(), userInput.name, userInput.age);
        const answers = new AnswersEntity(
            uuidv4(),
            userInput.car,
            userInput.engine
        );
        const carQuestionnaire = new CarQuestionnaireEntity(
            uuidv4(),
            user,
            answers
        );

        const handler = new CarQuestionnaireHandler(
            new CarQuestionnaireRepository()
        );
        const response: CarQuestionnaireResponse =
            handler.submit(carQuestionnaire);

        ExternalLogger.logSomeAdditionalParams([
            userInput.userDevice,
            userInput.submissionDate,
        ]);

        return (
            '' +
            '<div>' +
            '<p>Questionnaire summary:</p>' +
            '<li>' +
            response.car +
            '</li>' +
            '<li>' +
            response.engine +
            '</li>' +
            '</div>'
        );
    }

    public submitWorkshopQuestionnaire(workshopInput: WorkshopAnswers): void {
        const workshop = new WorkshopEntity(
            uuidv4(),
            workshopInput['workshop-name']
        );
        const answers = new WorkshopAnswersEntity(
            uuidv4(),
            workshopInput.car,
            workshopInput.engine,
            workshopInput.reason
        );
        const carQuestionnaire = new WorkshopCarQuestionnaireEntity(
            uuidv4(),
            workshop,
            answers
        );

        const handler = new WorkshopCarQuestionnaireHandler(
            new WorkshopCarQuestionnaireRepository()
        );

        handler.submit(carQuestionnaire);
    }
}

export class CarQuestionnaireRepository {
    save(entity: CarQuestionnaireEntity): void {
        // [SI] Imagine that here we are storing the data to a MySQL database
        console.log('Save questionnaire of: ' + entity.user.name);

        MySqlAccessService.saveToTable('Questionnaires', {
            id: entity.id,
            userId: entity.user.id,
            answersId: entity.questions.id,
        });

        MySqlAccessService.saveToTable('Users', {
            id: entity.user.id,
            userName: entity.user.name,
            userAge: entity.user.age,
        });

        MySqlAccessService.saveToTable('Answers', {
            id: entity.questions.id,
            car: entity.questions.car,
            engine: entity.questions.engine,
        });
    }
}

export class WorkshopCarQuestionnaireRepository {
    save(entity: WorkshopCarQuestionnaireEntity): void {
        // [SI] Imagine that here we are storing the data to a MySQL database
        console.log('Save questionnaire of: ' + entity.workshop.name);

        MySqlAccessService.saveToTable('Questionnaires', {
            id: entity.id,
            userId: entity.workshop.id,
            answersId: entity.questions.id,
        });

        MySqlAccessService.saveToTable('Workshops', {
            id: entity.workshop.id,
            workshopName: entity.workshop.name,
        });

        MySqlAccessService.saveToTable('Answers', {
            id: entity.questions.id,
            car: entity.questions.car,
            engine: entity.questions.engine,
        });
    }
}

class ExternalLogger {
    static logSomeAdditionalParams(paramsToLog: string[]): void {
        console.log('\nLogging some params: ' + paramsToLog + '\n');
    }
}

class MySqlAccessService {
    static saveToTable(tableName: string, data: object): void {
        // [SI] Imagine that here we are storing the data in a MySQL database
        console.log('DB: saving to table ' + tableName);
        console.log(data);
        console.log('\n');
    }
}

// [SI]
// THIS IS THE END OF THE IMPLEMENTATION
