#include <drogon/drogon_test.h>
#include <drogon/drogon.h>

DROGON_TEST(RemoteAPITest)
{
    auto client = drogon::HttpClient::newHttpClient("http://localhost:3000");
    auto req = drogon::HttpRequest::newHttpRequest();
    req->setPath("/jobs");
    client->sendRequest(req, [TEST_CTX](drogon::ReqResult res, const drogon::HttpResponsePtr& resp) {
        REQUIRE(res == drogon::ReqResult::Ok);
        REQUIRE(resp != nullptr);
        CHECK(resp->getStatusCode() == drogon::k200OK);
        CHECK(resp->contentType() == drogon::CT_APPLICATION_JSON);
    });
}
