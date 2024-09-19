import { pool } from "../db.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = (await pool.query(`SELECT * FROM posts ORDER BY id`)).rows;
    if (posts.length === 0)
      return res.status(404).json({ message: "No hay posts disponibles" });
    res.status(200).json({ ok: true, posts: posts.length > 0 ? posts : [] });
  } catch (error) {
    console.log(error);
    res.status(500).json("Ocurrio un error");
  }
};

const addPost = async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const query = `INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, null) RETURNING *`;
    const result = (await pool.query(query, [titulo, img, descripcion]))
      .rows[0];
    return res.status(201).json({ ok: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json("Ocurrio un error");
  }
};

const putLike = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0)
      return res
        .status(404)
        .json({ message: "No se pudo modificar el like, no hay post con ese id" });
    return res.status(200).json({ ok: true, message: "Like modificado" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Ocurrio un error");
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM posts WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0)
      return res
        .status(404)
        .json({ message: "No se pudo eliminar post, no hay post con ese id" });
    return res.status(200).json({ ok: true, message: "Post eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Ocurrio un error");
  }
};

export const controller = {
  getAllPosts,
  addPost,
  putLike,
  deletePost,
};
