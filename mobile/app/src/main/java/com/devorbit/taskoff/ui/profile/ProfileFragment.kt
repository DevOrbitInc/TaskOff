package com.devorbit.taskoff.ui.profile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.devorbit.taskoff.R
import com.devorbit.taskoff.data.api.SessionTokenStore
import com.devorbit.taskoff.databinding.FragmentProfileBinding

class ProfileFragment : Fragment() {
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val user = SessionTokenStore.user(requireContext())
        binding.profileNameText.text = user?.fullName ?: getString(R.string.profile_unknown_name)
        binding.profileEmailText.text = user?.email ?: getString(R.string.profile_unknown_email)

        binding.backButton.setOnClickListener {
            findNavController().navigateUp()
        }
        binding.logoutButton.setOnClickListener {
            SessionTokenStore.clear(requireContext())
            findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
