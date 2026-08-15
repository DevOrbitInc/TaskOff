package com.devorbit.taskoff.ui.tasks

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.core.view.isVisible
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.devorbit.taskoff.R
import com.devorbit.taskoff.databinding.FragmentTaskListBinding
import com.devorbit.taskoff.viewmodels.TaskViewModel
import com.devorbit.taskoff.viewmodels.TaskViewModelFactory

class TaskListFragment : Fragment() {
    private var _binding: FragmentTaskListBinding? = null
    private val binding get() = _binding!!

    private val viewModel: TaskViewModel by viewModels {
        TaskViewModelFactory(requireContext().applicationContext)
    }
    private val adapter = TaskListAdapter()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentTaskListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.profileButton.setOnClickListener {
            findNavController().navigate(R.id.action_taskListFragment_to_profileFragment)
        }

        binding.taskRecyclerView.layoutManager = LinearLayoutManager(requireContext())
        binding.taskRecyclerView.adapter = adapter
        binding.taskRecyclerView.setHasFixedSize(true)

        binding.retryButton.setOnClickListener {
            viewModel.loadTasks()
        }

        viewModel.uiState.observe(viewLifecycleOwner, ::render)

        if (viewModel.uiState.value == null) {
            viewModel.loadTasks()
        }
    }

    private fun render(state: TaskListUiState) = with(binding) {
        loadingIndicator.isVisible = state is TaskListUiState.Loading
        taskRecyclerView.isVisible = state is TaskListUiState.Content
        taskStateGroup.isVisible = state is TaskListUiState.Empty || state is TaskListUiState.Error

        when (state) {
            is TaskListUiState.Content -> {
                adapter.submitList(state.tasks)
                taskCountText.text = resources.getQuantityString(
                    R.plurals.task_count,
                    state.tasks.size,
                    state.tasks.size
                )
            }
            TaskListUiState.Empty -> {
                taskCountText.setText(R.string.task_count_empty)
                stateTitleText.setText(R.string.task_list_empty_title)
                stateMessageText.setText(R.string.task_list_empty_message)
                retryButton.isVisible = false
            }
            is TaskListUiState.Error -> {
                taskCountText.setText(R.string.task_count_unavailable)
                stateTitleText.setText(R.string.task_list_error_title)
                stateMessageText.text = state.message
                retryButton.isVisible = true
            }
            TaskListUiState.Loading -> taskCountText.setText(R.string.task_count_loading)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
