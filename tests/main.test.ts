import {Controller} from "../src/main";
import {expect} from "chai";

describe('Run the App \n\n', function () {
    it('Should run', function () {
        // [SI] The const userInput represents the submitted data

        const userInput = {
            // [SI] User form data
            name: 'Tomek',
            age: 18,
            car: 'Dacia Sandero',
            engine: 1.0,
            // [SI] Additional data appended by the application
            userDevice: 'Android',
            submissionDate: '2200-02-02'
        }

        // [SI] This is how some other call would call the controller as part of the running application
        const response = new Controller().submitCarQuestionnaire(userInput);

        expect(response).to.equal(
            '<div>' +
                '<p>Questionnaire summary:</p>' +
                '<li>Dacia Sandero is an amazing car!</li>' +
                '<li>1 engine is so efficient!</li>' +
            '</div>'
        );
    });
});