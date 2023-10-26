import { STORAGE_KEY } from "~/constant/localStorage";
import { saveStorage, clearStorage, getLocalStorage } from "~/utils/storage";

const mockData = {
  email: "test@example.com",
  accessToken: "sampleAccessToken",
};

test("save local storage success", () => {
  saveStorage(mockData);
  expect(localStorage.getItem(STORAGE_KEY.EMAIL)).toEqual(mockData.email);
  expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).toEqual(
    mockData.accessToken
  );
});

test("get local storage success", () => {
  expect(localStorage.getItem(STORAGE_KEY.EMAIL)).toEqual(
    getLocalStorage(STORAGE_KEY.EMAIL)
  );

  expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).toEqual(
    getLocalStorage(STORAGE_KEY.ACCESS_TOKEN)
  );
});

test("clear local storage success", () => {
  expect(localStorage.clear()).toEqual(clearStorage());
});
