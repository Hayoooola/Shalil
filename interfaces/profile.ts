import LANGUAGES from "../enums/language";

interface IProfile {
    name: string;
    phone: string;
    email: string;
    language: LANGUAGES.PERSIAN;
    imageUri: string | null;
}

export default IProfile;