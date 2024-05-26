import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, sendEmailVerification, updatePassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '../services/Firebase';
import { collection, connectFirestoreEmulator, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const login = async (identifier, password) => {
		try {
			if (isValidEmail(identifier)) {
				signInWithEmailAndPassword(auth, identifier, password)
					.then(async (userCredentials) => {
						const userData = await getUserData(userCredentials.user.uid);
						setCurrentUser(userData)

					})
					.catch((error) => {
						if (error.code == 'auth/invalid-credential')
							console.error('Login Error: ', error);
					})
			} else {
				const email = await getUserEmailByUsername(identifier);
				signInWithEmailAndPassword(auth, email, password)
					.then(async (userCredentials) => {
						const userData = await getUserData(userCredentials.user.uid);
						setCurrentUser(userData)

					})
					.catch((error) => {
						if (error.code == 'auth/invalid-credential')
							console.error('Login Error: ', error);
					})

			}
		} catch (error) {
			console.error(error);
		}

	}

	const signup = async (email, password, username) => {
		try {
			const isUsernameUnique = async () => {
				try {
					const q = query(collection(db, 'users'), where('username', '==', username))
					const querySnapshot = await getDocs(q)
					return querySnapshot.empty
				} catch (error) {
					console.error('error checking uniqueness');
					console.error(error);
				}

			}

			const isUnique = await isUsernameUnique(username);


			if (!isUnique) {
				console.log(' username already exists!')
				return
			}

			createUserWithEmailAndPassword(auth, email, password)
				.then(async (result) => {

					await setDoc(doc(db, 'users', result.user.uid), {
						uid: result.user.uid,
						username: username,
						email: email,
						dob: '',
						phoneNumber: '',
						bio: '',
						displayName: '',
						name: {
							first: '',
							last: '',
						},
						address: {
							street: '',
							city: '',
							state: '',
							zip: '',
						},
						access: 'user',
					});
					alert('Account created !');
					verifyEmail(result.user);
					login(email, password)
				})
				.catch(error => {
					if (error.code == 'auth/email-already-in-use')
						console.log('Email Already In Use, Continue to Login!')
					console.error(error);
				})
		}
		catch (error) {
			console.error(error);
		}
	}

	const logout = () => {
		signOut(auth)
			.then(result => {
				console.log('logged out')
			})
			.catch(error => {
				console.error(error);
			})
	}

	const verifyEmail = (user) => {
		user && sendEmailVerification(user)
			.then(result => {
				console.log('Email Verification link Sent, please verify your email!')
			})
			.catch(error => {
				console.error(error);
			})
	}

	const updatePassword = (email) => {
		sendPasswordResetEmail(auth, email)
			.then(result => {
				console.log('password rest link sent on your email');
			})
			.catch(error => {
				console.error(error);
			});
	}

	const forgotPassword = async (email) => {
		try {
			if (isValidEmail(identifier)) {
				sendPasswordResetEmail(auth, identifier)
					.then( result => {
						console.log('Password Email Link sent!')

					})
					.catch((error) => {
						if (error.code == 'auth/missing-email')
							console.error('Login Error: ', error);
					})
			} else {
				const email = await getUserEmailByUsername(identifier);
				sendPasswordResetEmail(auth, email)
					.then( result => {
						console.log('Password email link sent!')
					})
					.catch((error) => {
						if (error.code == 'auth/missing-email')
							console.error('Login Error: ', error);
					})

			}
		} catch (error) {
			console.error(error);
		}

	}


	const getUserData = useCallback((uid) => {
		const userDocRef = doc(db, "users", uid);
		console.log('getDoc run')
		return getDoc(userDocRef)
			.then((doc) => {
				if (doc.exists()) {
					return doc.data();
				} else {
					console.log("No such document!");
					return null;
				}
			})
			.catch((error) => {
				console.error("Error getting document:", error);
				return null;
			});
	}, []);

	const isValidEmail = (input) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(input);
	}

	const getUserEmailByUsername = async (username) => {
		try {
			const q = query(collection(db, 'users'), where('username', '==', username))
			const querySnapshot = await getDocs(q)

			if (!querySnapshot.empty) {
				const userData = querySnapshot.docs[0].data();
				return userData.email;
			} else {
				// Handle the case where no user with the given username is found
				console.log(`No user found with the username: ${username}`);
				return null; // or throw an error or handle it as per your application logic
			}
		} catch (error) {
			console.error('Error getting user email by username:', error);
			// Handle the error as needed
			return null;
		}
	};



	const isUsernameUnique = async (username) => {
		try {
			const q = query(collection(db, 'users'), where('username', '==', username));
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				return true;
			}

			const existingUser = querySnapshot.docs[0].data();
			const existingUserId = existingUser.uid;

			return currentUser.uid === existingUserId;
		} catch (error) {
			console.error('Error checking username uniqueness:', error);
			return false;
		}
	};


	const updateCurrentUser = async (inputRefs) => {

		try {
			const username = inputRefs.username.current.value;
			const email = inputRefs.email.current.value
			const password = inputRefs.password.current.value
			const first = inputRefs.name.first.current.value
			const last = inputRefs.name.last.current.value
			const street = inputRefs.address.street.current.value
			const city = inputRefs.address.city.current.value
			const state = inputRefs.address.state.current.value
			const zip = inputRefs.address.zip.current.value
			const dob = inputRefs.dob.current.value
			const phoneNumber = inputRefs.phone.current.value
			const bio = inputRefs.bio.current.value


			console.log(username)

			if (await isUsernameUnique(username)) {
				await updateDoc(doc(db, 'users', currentUser.uid), {
					username: username,
					email: email,
					password: password,
					name: {
						first: first,
						last: last,
					},
					address: {
						street: street,
						city: city,
						state: state,
						zip: zip,
					},
					dob: dob,
					phoneNumber: phoneNumber,
					bio: bio

				}, { merge: true });

				authStateListener();
			} else {
				console.log('Username is not unique');
				console.log('Username already exists. Please choose a different username.');
			}
		} catch (error) {
			console.error('Error updating current user:', error);
		}

	}

	const authStateListener = useCallback(() => {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				const userData = getUserData(user.uid);
				userData.then((data) => {
					setCurrentUser(data);
				});
			} else {
				setCurrentUser(null);
			}
		});
	}, [getUserData, setCurrentUser]);

	useEffect(() => {
		const unsubscribe = authStateListener();

		return () => {
			unsubscribe();
		};
	}, [authStateListener]);

	const value = {
		currentUser,
		updateCurrentUser,
		login,
		logout,
		signup,
		verifyEmail,
		updatePassword,
		forgotPassword,
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext);
}
