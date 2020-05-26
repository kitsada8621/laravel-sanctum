<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function index() {
        return User::latest()->get();
    }

    public function store(UserRequest $request) {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'successfully'
        ]);
    }

    public function update(UserRequest $request,$id) {
        User::where('id',$id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json([
            'message' => 'update successfully',
        ]);
    }

    public function delete($id) {
        User::findOrfail($id)->delete();
        return response()->json([
            'message' => 'deleted successfully',
        ]);
    }
}
