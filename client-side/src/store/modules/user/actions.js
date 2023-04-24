export default {
  async getUser(_, payload) {
    const userID = payload.userID;

    try {
      const response = await fetch(`/api/user?userID=${userID}`);

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error); // Throw error to be caught in the component
      }
    } catch (error) {
      throw new Error(error.message); // Throw error to be caught in the component
    }
  },
  async getUserTeams(_, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/user/teams?userID=${userID}&organizationID=${organizationID}`);

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
  async getUserProjects(_, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;

    try {
      const response = await fetch(`/api/user/projects?userID=${userID}&organizationID=${organizationID}`);

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

  async requestConnection(context, payload) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const request = await fetch(`/api/user/requestConnection?userId=${payload.userId}&orgID=${payload.orgID}`, requestOptions);

      if (!request.ok) {
        throw new Error();
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  async recommentedConnections(context, payload) {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
        },
      };

      const response = await fetch(`/api/organization/recommentedConnections?orgID=${payload.orgID}`, requestOptions);

      const reccomentedConnections = await response.json();

      return reccomentedConnections;
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  },
};