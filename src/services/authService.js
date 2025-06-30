import axios from '../configs/axios';

export const authService = {
    async login(email, password) {
        try {
            const response = await axios.post('/Login', {
                email,
                password
            });

            // Ensure token is stored with Bearer prefix
            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);
            const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
            localStorage.setItem('token', bearerToken);

            // Store user data separately
            localStorage.setItem('authUser', JSON.stringify(response.data.user));

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    async googleLogin(googleUserInfo) {
        try {
            if (!googleUserInfo || !googleUserInfo.IdToken) {
                throw new Error('No credentials received');
            }

            console.log('Sending to backend:', googleUserInfo); // Debug log

            const response = await axios.post('/LoginGoogle', {
                idToken: googleUserInfo.IdToken,
                name: googleUserInfo.Name,
                email: googleUserInfo.Email,
                phoneNumber: googleUserInfo.PhoneNumber || '',
                picture: googleUserInfo.Picture || ''
            });

            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);

            console.log('Google login response:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Google login error:', error);
            throw error.response?.data || {
                message: error.message || 'Google login failed'
            };
        }
    },

    async register(userData) {
        try {
            const response = await axios.post('/Register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Registration failed' };
        }
    },

    async resetPassword(email, token, newPassword) {
        try {
            const response = await axios.post('/Password/reset', {
                email,
                token,
                newPassword
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Password reset failed' };
        }
    },

    async forgotPassword(email) {
        try {
            const response = await axios.post('/Password/forgot', {
                email
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Password update failed' };
        }
    },

    getUserProfile: async (userID) => {
        try {
            const response = await axios.get(`/User/${userID}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch user profile' };
        }
    },

    updateUserProfile: async (id, userData) => {
        try {
            const response = await axios.put(`/User/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update profile' };
        }
    },
    // Xác thực email
    verifyEmail: async (email, token) => {
        try {
            const response = await axios.post('/api/EmailVerification', { email, token });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },
    resendVerificationEmail: async (email) => {
        try {
            const response = await axios.post(`/api/EmailVerification/Resend/${encodeURIComponent(email)}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    }
};