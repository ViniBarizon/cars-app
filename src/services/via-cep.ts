import http from "@/services/http";

export default async function viaCep(cep: string) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const response = await http.get(url);
  console.log(response);
  return response.data;
}
