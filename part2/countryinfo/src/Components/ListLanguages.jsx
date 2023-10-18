export default function ListLanguages({ country }) {
    return Object.values(country.languages).map((language) => {
      return <li key={language}>{language}</li>;
    });
  }