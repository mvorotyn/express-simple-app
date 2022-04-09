import ky from "ky";

// const json = await ky.post('https://example.com', {json: {foo: true}}).json();

// console.log(json);

class ApiService {
  apiBaseURL = "http://localhost:3005/api/v1/";
  //   api = ky.extend({
  //     hooks: {
  //       beforeRequest: [
  //         (request) => {
  //           request.headers.set("Authorization", "Bearer dasdsadsadas...");
  //         },
  //       ],
  //     },
  //   });
  api = ky.create({ prefixUrl: this.apiBaseURL });

  getUsers = async (page: number, usersPerPage: number): Promise<any> => {
    console.log("apiService getUsers");
    const url = `users/?page=${page}&count=${usersPerPage}`;
    const json = await this.api.get(url).json();
    // console.log(json, 222);
    return json;
  };
}

export const apiService = new ApiService();
// apiService.getUsers(5, 10);
