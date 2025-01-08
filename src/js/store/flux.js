const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			setContacts: (contacts) => {
				setStore({ contacts: contacts });
			},
			loadContacts: () => {
				fetch('https://playground.4geeks.com/contact/agendas/arnauoliveras/contacts', {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						console.log(resp.ok);
						console.log(resp.status);
						return resp.json();
					})
					.then(data => {
						console.log(data);
						setStore({contacts: data.contacts});
					})
					.catch(error => {
						console.log(error);
					});

			}
		}
	};
};

export default getState;
