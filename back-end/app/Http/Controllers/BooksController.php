<?php


namespace App\Http\Controllers;


use App\Books;
use Illuminate\Http\Request;


class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->middleware('permission:books-list|books-create|books-edit|books-delete', ['only' => ['index', 'show']]);
        $this->middleware('permission:books-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:books-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:books-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Books::latest()->paginate(5);
        return view('books.index', compact('books'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('books.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate([
            'name' => 'required',
            'detail' => 'required',
        ]);


        Books::create($request->all());


        return redirect()->route('books.index')
            ->with('success', 'Books created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param \App\Books $product
     * @return \Illuminate\Http\Response
     */
    public function show(Books $product)
    {
        return view('books.show', compact('books'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Books $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Books $product)
    {
        return view('books.edit', compact('books'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Books $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Books $product)
    {
        request()->validate([
            'name' => 'required',
            'detail' => 'required',
        ]);


        $product->update($request->all());


        return redirect()->route('books.index')
            ->with('success', 'Books updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Books $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Books $product)
    {
        $product->delete();


        return redirect()->route('books.index')
            ->with('success', 'Books deleted successfully');
    }
}
