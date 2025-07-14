cmake_minimum_required(VERSION 3.5)
project(org_chart_test CXX)

find_package(Drogon REQUIRED)
find_package(GTest REQUIRED)
find_package(PkgConfig REQUIRED)
pkg_check_modules(JSONCPP jsoncpp)

add_executable(${PROJECT_NAME}
    test_main.cc
    test_controllers.cc
    AuthController_test.cc
    DepartmentsController_test.cc
    JobsController_test.cc
    PersonsController_test.cc
    ../controllers/AuthController.cc
    ../controllers/DepartmentsController.cc
    ../controllers/JobsController.cc
    ../controllers/PersonsController.cc
    ../models/User.cc
    ../models/Department.cc
    ../models/Job.cc
    ../models/Person.cc
    ../models/PersonInfo.cc
    ../plugins/Jwt.cc
    ../plugins/JwtPlugin.cc
    ../filters/LoginFilter.cc
    ../utils/utils.cc
)

target_include_directories(${PROJECT_NAME} PRIVATE 
    ../controllers
    ../models
    ../plugins
    ../filters
    ../utils
    ../third_party
)

target_link_libraries(${PROJECT_NAME} PRIVATE 
    Drogon::Drogon
    GTest::gtest
    GTest::gmock
    ${JSONCPP_LIBRARIES}
    bcrypt
)

target_compile_options(${PROJECT_NAME} PRIVATE ${JSONCPP_CFLAGS_OTHER})
