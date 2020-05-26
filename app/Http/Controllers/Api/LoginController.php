<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{


    public function login(Request $request) {
        
        $credentials = $request->only('email','password');
        if(!auth()->validate($credentials)) {
            return response()->json([
                'message' => 'credentails do not match.',
            ],401);
        }

        $user = User::where('email',$credentials['email'])->first();
        $user->tokens()->delete();
        $token = $user->createToken($credentials['email']);
        
        return response()->json([
            'message' => 'logged in successfully',
            'token' => $token->plainTextToken,
            'user' => $user,
        ]);

    }
}
