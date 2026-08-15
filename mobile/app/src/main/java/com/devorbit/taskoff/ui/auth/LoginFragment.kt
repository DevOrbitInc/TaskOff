package com.devorbit.taskoff.ui.auth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.devorbit.taskoff.R
import com.devorbit.taskoff.data.api.SessionTokenStore
import com.devorbit.taskoff.databinding.FragmentLoginBinding
import com.devorbit.taskoff.viewmodels.AuthUiState
import com.devorbit.taskoff.viewmodels.AuthViewModel
import com.devorbit.taskoff.viewmodels.AuthViewModelFactory

class LoginFragment : Fragment() {
    private var _binding: FragmentLoginBinding? = null
    private val binding get() = _binding!!

    private val viewModel: AuthViewModel by viewModels {
        AuthViewModelFactory(requireContext().applicationContext)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (savedInstanceState == null && SessionTokenStore.token(requireContext()) != null) {
            navigateToTasks()
            return
        }

        binding.loginButton.setOnClickListener {
            viewModel.login(
                email = binding.emailInput.text?.toString().orEmpty(),
                password = binding.passwordInput.text?.toString().orEmpty()
            )
        }

        viewModel.uiState.observe(viewLifecycleOwner, ::render)
    }

    private fun render(state: AuthUiState) = with(binding) {
        loginProgress.isVisible = state is AuthUiState.Loading
        loginButton.isEnabled = state !is AuthUiState.Loading
        loginErrorText.isVisible = state is AuthUiState.Error

        if (state is AuthUiState.Error) {
            loginErrorText.text = state.message
        }
        if (state is AuthUiState.Success) {
            navigateToTasks()
        }
    }

    private fun navigateToTasks() {
        findNavController().navigate(R.id.action_loginFragment_to_taskListFragment)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
