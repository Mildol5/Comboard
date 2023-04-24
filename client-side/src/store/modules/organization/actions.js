export default {
  selectOrganization(context, payload) {
    const organizationID = payload.organizationID;

    if (organizationID) {
      context.commit("setSelectedOrganization", { organizationID });
      localStorage.setItem("organizationID", organizationID);
    }
  },
  removeSelectedOrganization(context) {
    localStorage.removeItem("organizationID");

    context.commit("setSelectedOrganization", { organizationID: null });
  },
  async registerOrganization(context, payload) {
    const organizationObj = {
      name: payload.name,
      email: payload.email,
      telephone: payload.phone,
      vatNumber: payload.vatNumber,
      location: payload.location,
      websiteURL: payload.website,
    };

    // The user who created the organization and submits the form
    const userID = context.rootGetters.loggedUserID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationObj, userID }),
    };

    try {
      const response = await fetch("/api/organization", requestOptions);

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message || "Error creating new organization!");
    }
  },
  async joinOrganization(context, payload) {
    const organizationKey = payload.organizationKey;
    const userID = payload.userID;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationKey, userID }),
    };

    try {
      const response = await fetch("/api/organization/join", requestOptions);

      const data = await response.json();

      if (response.ok) {
        context.commit("addOrganization", { organizationID: data?.organizationID, organizationName: data?.organizationName });
        return data;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message || "Error joining organization!");
    }
  },
  async getUserOrganizations(context, payload) {
    const userID = payload.userID;

    try {
      const response = await fetch(`/api/user/organizations?userID=${userID}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      context.commit("setOrganizations", data?.organizations);
    } catch (error) {
      throw new Error(error.message || "Error get user's organization!");
    }
  },
  async getOrganizationUsers(_, payload) {
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/organization/members?organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.members;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getOrganizationTeams(_, payload) {
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/organization/teams?organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.teams;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getOrganizationProjects(_, payload) {
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/organization/projects?organizationID=${organizationID}`);

      const data = await response.json();

      if (response.ok) {
        return data?.projects;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  tryAutoOrganizationLoad(context) {
    const organizationID = localStorage.getItem("organizationID");

    if (organizationID) {
      context.commit("setSelectedOrganization", { organizationID });
    }
  },
};
