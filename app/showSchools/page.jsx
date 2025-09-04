import ShowSchoolsClient from "./ShowSchoolsClient";

export default async function ShowSchoolsPage({ searchParams }) {

  const params = await searchParams;
  const search = params?.query || "";

  return <ShowSchoolsClient initialSearch={search} />;
}
