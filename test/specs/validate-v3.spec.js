"use strict";

const helper = require("../fixtures/helper");
const expect = require("chai").expect;

describe("swagger-cli validate (OpenAPI v3.0)", () => {

  it("should check for mismatches between URL parameters and path parameters", () => {
    let output = helper.run("--debug", "validate", "test/files/invalid/path-params-v3/api-in-mismatch.yaml");

    expect(output.stdout).not.to.have.lengthOf(0);
    expect(output.stderr).to.include("is missing path parameter(s) for {personRefId}");
    expect(output.status).to.equal(1);
  });

  it("should check for mismatches between URL parameter names and path parameter names", () => {
    let output = helper.run("--debug", "validate", "test/files/invalid/path-params-v3/api-name-mismatch.yaml");

    expect(output.stdout).not.to.have.lengthOf(0);
    expect(output.stderr).to.include("has a path parameter named \"personId\", but there is no corresponding {personId} in the path string");
    expect(output.status).to.equal(1);
  });

  it("should check for URL parameter definition being missed out altogether", () => {
    let output = helper.run("--debug", "validate", "test/files/invalid/path-params-v3/api-missing.yaml");

    expect(output.stdout).not.to.have.lengthOf(0);
    expect(output.stderr).to.include("is missing path parameter(s) for {personRefId}");
    expect(output.status).to.equal(1);
  });

  it("should check for required property name mismatches", () => {
    let output = helper.run("--debug", "validate", "test/files/invalid/schema-v3/api-required-mismatch.yaml");

    expect(output.stdout).not.to.have.lengthOf(0);
    expect(output.stderr).to.include("listed as required but does not exist");
    expect(output.status).to.equal(1);
  });

});
