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
						if (data.contacts && data.contacts.length > 0) {
							console.log(data);
							setStore({contacts: data.contacts});
						} else {
							fetch('https://playground.4geeks.com/contact/agendas/arnauoliveras/contacts', {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								}
							})
						}
					})
					.catch(error => {
						console.log("Error al cargar los contactos:", error);
					});
			}
		}
	};
};

export default getState;
