import userApi from "./user";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("用户接口",()=>{

    const data = {"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjpudWxsLCJ1c2VyX25hbWUiOiJhZG1pbiIsImF2YXRhciI6bnVsbCwiZGlzcGxheV9uYW1lIjpudWxsLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIiwiUk9MRV9BQ1RVQVRPUiJdLCJjbGllbnRfaWQiOiJhcHBfd2ViX2NsaWVudCIsImF1ZCI6WyJvYXV0aDItcmVzb3VyY2UiXSwid3hfb3BlbmlkIjpudWxsLCJwaG9uZSI6bnVsbCwic2NvcGUiOlsid3JpdGVfc2NvcGUiLCJhZG1pbl9zY29wZSIsInJlYWRfc2NvcGUiXSwiaWQiOjEsImV4cCI6MTUzODEzNDg4OCwianRpIjoiMzE3ZWNjOWEtMTcxNy00MTBmLWI2MTItYjk5YzViMGM0N2NkIiwidXNlcm5hbWUiOiJhZG1pbiJ9.fr4a757CGPcbZqPxitSCVfKRe91zGp4IwcB_BH3dHTQ-YLr-KTav4XKlen97JGmNqMcEpfp0EwLx0dsETYvdIVVMpcdLXTZ46YZTBJKRplwEs4M3XUo_NUEKwq5eVTiwOiQ75NC418GGWcnefcRKpfdhqBjRt2xOJxPAlbVcmp3XgHpJ5USJxCaqRJAf99gXjmNtcscwcRhuJ2YnEm67bSjhgRKcIP1nX5vDK9rI1bE3qAmsQvLvkCEYYSdt8RK3yribQg9VlFEaLyv_YgcLh5YqEqa0-pJ9MIEOBR_wjy5lRfyHp9wJWDk4KbZzyuX6aCezv-cMzx-OEQhXpX2Jew","token_type":"bearer","refresh_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjpudWxsLCJ1c2VyX25hbWUiOiJhZG1pbiIsImF2YXRhciI6bnVsbCwiZGlzcGxheV9uYW1lIjpudWxsLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIiwiUk9MRV9BQ1RVQVRPUiJdLCJjbGllbnRfaWQiOiJhcHBfd2ViX2NsaWVudCIsImF1ZCI6WyJvYXV0aDItcmVzb3VyY2UiXSwid3hfb3BlbmlkIjpudWxsLCJwaG9uZSI6bnVsbCwic2NvcGUiOlsid3JpdGVfc2NvcGUiLCJhZG1pbl9zY29wZSIsInJlYWRfc2NvcGUiXSwiYXRpIjoiMzE3ZWNjOWEtMTcxNy00MTBmLWI2MTItYjk5YzViMGM0N2NkIiwiaWQiOjEsImV4cCI6MTUzODEzNDg4OCwianRpIjoiZDA1NDdhMmYtOWNmNS00NDkzLWEyM2QtYmEwNzI4NzYxOWU1IiwidXNlcm5hbWUiOiJhZG1pbiJ9.AVlvHz-bPo4Uk9AxtHEy75AsVEM0Bg6JFaK3ervdjp134YdrdSEmZn6hNsOmGouC5Ut2pUnQ5UnNS86IOTZW1XgHHSW9ikOrZdFFmqKmE_DuryFC50orW9lU_s4LrEl10PpCljwiorlp2GlVtEWIgdDGWvCo8WHCl_ivd9eCh4Zj9JPbqF3xxmaqLS6c8-GuNCKklRyp58Gq8zOy8K90Qoufpk1-8mCkNxB82H9OK4ob2o_pBmI9mJkOGTcOx8U9fA6y_7MmclUHiA6MoBv9GKWch4qFCvr_BOS3ZA8mN_Uj64B_y26kSqYi_-9iiYbTeUch6q9VMwxgr4QO2cEesA","expires_in":2591999,"scope":"write_scope admin_scope read_scope","wx_openid":null,"avatar":null,"display_name":null,"username":"admin","jti":"317ecc9a-1717-410f-b612-b99c5b0c47cd"};

    beforeEach(()=>{
        var mock = new MockAdapter(axios);
        mock.onPost("/oauth/token").reply(200,data);
    });

    test("登陆",()=>{
        userApi.login("admin","admin").then(res=>{
            expect(res.data.username).toEqual("admin");
        });
    })


});