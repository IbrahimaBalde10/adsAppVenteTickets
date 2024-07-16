// src/store/modules/TransactionsModule.js
import axios from 'axios';
import router from '@/router';

const state = {
  transactions: [],
  errorMessage: null,
};

const getters = {
  allTransactions: (state) => state.transactions,
  errorMessage: (state) => state.errorMessage,
  transactionCount: state => state.transactions.length, // Compter les transactions
};


const actions = {
  async fetchTransactions({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8000/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('setTransactions', response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          console.error('Forbidden: You do not have the right permissions to access this resource.');
        } else if (error.response.status === 401) {
          console.error('Unauthorized: Invalid or expired token.');
          router.push({ name: 'login' });
        } else {
          console.error(`Error ${error.response.status}: ${error.response.data.message}`);
        }
      } else {
        console.error('Failed to fetch transactions:', error);
      }
    }
  },

  async deleteTransaction({ commit }, transactionId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('removeTransaction', transactionId);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      throw error;
    }
  },

}

const mutations = {
  setTransactions(state, transactions) {
    state.transactions = transactions;
  },
   removeTransaction(state, transactionId) {
    state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
  },
  setErrorMessage(state, message) {
    state.errorMessage = message;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
