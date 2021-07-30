<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Vehicle;
use App\Models\Key;
use App\Models\Technician;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
//use Illuminate\Validation\Validator;
use Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $newOrders = [];

        $orders = Order::all();
        //dd($orders);
        foreach ($orders as $order) {
            $oneOrder = $order;
            $vehicle_id = $order->vehicle_id;
            $technician_id = $order->technician_id;
            $key_id = $order->key_id;
            $vehicle = Vehicle::findOrfail($vehicle_id);
            $technician = Technician::findOrfail($technician_id);
            $key = Key::findOrfail($key_id);
            if ($vehicle) {
                $oneOrder->vehicleInfo = $vehicle;
            }
            if ($technician) {
                $oneOrder->technicianInfo = $technician;
            }
            if ($key) {
                $oneOrder->keyInfo = $key;
            }
            $newOrders[] = $oneOrder;
        }
        //dd($newOrders);
        return response([ 'orders' => ProjectResource::collection($newOrders), 'message' => 'Retrieved successfully'], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = $request->all();
        \Log::debug($data);

        $validator = Validator::make($data, [
            'vehicle_id' => 'required',
            'technician_id' => 'required',
            'key_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response(['error' => $validator->errors(), 'Validation Error','message'=>'missing required fields'], 400);
        }

        $project = Order::create($data);

        return response(['order' => new ProjectResource($project), 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
        $oneOrder = $order;
        $vehicle_id = $order->vehicle_id;
        $technician_id = $order->technician_id;
        $key_id = $order->key_id;
        $vehicle = Vehicle::findOrfail($vehicle_id);
        $technician = Technician::findOrfail($technician_id);
        $key = Key::findOrfail($key_id);
        if ($vehicle) {
            $oneOrder->vehicleInfo = $vehicle;
        }
        if ($technician) {
            $oneOrder->technicianInfo = $technician;
        }
        if ($key) {
            $oneOrder->keyInfo = $key;
        }
        return response(['order' => new ProjectResource($oneOrder), 'message' => 'Retrieved successfully'], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
        $order->update($request->all());

        return response(['project' => new ProjectResource($order), 'message' => 'Update successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
        $order->delete();

        return response(['message' => 'Deleted']);
    }
}
