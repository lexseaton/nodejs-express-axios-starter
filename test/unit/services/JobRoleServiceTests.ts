import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getJobRoles, URL } from '../../../src/services/JobRoleService';
import { OpenJobRoleResponse } from "../../../src/models/OpenJobRoleResponse";
import { describe, it } from "node:test";
import { Band } from "../../../src/models/Band";
import { Locations } from "../../../src/models/Locations";
import { Capability } from "../../../src/models/Capability";

const dt = new Date(2024, 3, 3);

// Create openJobRoleResponse object
const openJobRoleResponse: OpenJobRoleResponse = {
  jobRoleName: "testJobName1",
  jobRoleLocation: Locations.Belfast,
  jobRoleCapability: Capability.Delivery,
  jobRoleBand: Band.BAND1,
  jobRoleClosingDate: dt
}

/*
Unit test for getJobRoles response
*/

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getAllJobRoles', function () {
      it('should return job roles from response', async () => {
        const data = [openJobRoleResponse];

        mock.onGet(URL).reply(200, data);
        // Assertions
        const results = await getJobRoles();
        expect(results[0].jobRoleBand).to.deep.equal(openJobRoleResponse.jobRoleBand);
        expect(results[0].jobRoleCapability).to.deep.equal(openJobRoleResponse.jobRoleCapability);
        expect(results[0].jobRoleClosingDate).to.equal(openJobRoleResponse.jobRoleClosingDate.toISOString());
        expect(results[0].jobRoleLocation).to.deep.equal(openJobRoleResponse.jobRoleLocation);
        expect(results[0].jobRoleName).to.deep.equal(openJobRoleResponse.jobRoleName);

      })
    })
})
