package com.devorbit.taskoff.data.api

import android.content.Context
import com.devorbit.taskoff.BuildConfig
import com.devorbit.taskoff.data.models.User
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/** Creates the API client used by the read-only task list. */
object TaskApiFactory {
    fun create(context: Context): ApiService {
        val client = OkHttpClient.Builder()
            .addInterceptor(BearerTokenInterceptor(context.applicationContext))
            .apply {
                if (BuildConfig.DEBUG) {
                    addInterceptor(
                        HttpLoggingInterceptor().apply {
                            redactHeader("Authorization")
                            level = HttpLoggingInterceptor.Level.BASIC
                        }
                    )
                }
            }
            .build()

        return Retrofit.Builder()
            .baseUrl(BuildConfig.API_BASE_URL)
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}

/**
 * The task endpoint is protected by the server. Authentication can save its
 * access token under this key without the task feature needing to know about
 * the login flow.
 */
object SessionTokenStore {
    private const val preferencesName = "taskoff_session"
    private const val accessTokenKey = "access_token"
    private const val userIdKey = "user_id"
    private const val userFullNameKey = "user_full_name"
    private const val userEmailKey = "user_email"

    fun token(context: Context): String? = context
        .getSharedPreferences(preferencesName, Context.MODE_PRIVATE)
        .getString(accessTokenKey, null)
        ?.takeIf { it.isNotBlank() }

    fun save(context: Context, token: String, user: User? = null) {
        val editor = context.getSharedPreferences(preferencesName, Context.MODE_PRIVATE)
            .edit()
            .putString(accessTokenKey, token)

        user?.let {
            editor
                .putString(userIdKey, it.id)
                .putString(userFullNameKey, it.fullName)
                .putString(userEmailKey, it.email)
        }

        editor.apply()
    }

    fun user(context: Context): User? {
        val preferences = context.getSharedPreferences(preferencesName, Context.MODE_PRIVATE)
        val id = preferences.getString(userIdKey, null)
        val fullName = preferences.getString(userFullNameKey, null)
        val email = preferences.getString(userEmailKey, null)

        return if (id.isNullOrBlank() || fullName.isNullOrBlank() || email.isNullOrBlank()) {
            null
        } else {
            User(id = id, fullName = fullName, email = email)
        }
    }

    fun clear(context: Context) {
        context.getSharedPreferences(preferencesName, Context.MODE_PRIVATE)
            .edit()
            .remove(accessTokenKey)
            .remove(userIdKey)
            .remove(userFullNameKey)
            .remove(userEmailKey)
            .apply()
    }
}

private class BearerTokenInterceptor(
    private val applicationContext: Context
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request().newBuilder()
            .header("Accept", "application/json")
            .apply {
                SessionTokenStore.token(applicationContext)?.let { token ->
                    header("Authorization", "Bearer $token")
                }
            }
            .build()

        return chain.proceed(request)
    }
}
