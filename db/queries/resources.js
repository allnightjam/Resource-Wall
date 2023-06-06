const db = require('../connection');

const addResource = function(resource,userId) {

  const queryString = `INSERT INTO resources(title, resource_url, photo_url, description, category_id, user_id) VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`;
  return db.query(queryString, [resource['title'], resource['resource_url'], resource['photo_url'], resource['description'], resource['category_id'], userId])
    .then(data => {
      // console.log(JSON.stringify(data.rows));
      return data.rows;
    })
    .catch(error => {
      console.error("Error insert resource in queries:", error);
      throw error;
    });
};

const getAllResource = (userId) => {
  const queryString = `SELECT resources.*, users.username, users.avatar,
                      COALESCE(comments.t_comments, 0) AS t_comments,
                      COALESCE(likes.t_likes, 0) AS t_likes,
                      COALESCE(round(avgRating.avg_rating,1), 0) AS avg_rating,
                      COALESCE(rsUserLiked.liked, false) AS liked_rs_by
                      FROM resources
                      LEFT JOIN users ON resources.user_id = users.id
                      LEFT JOIN (
                        SELECT resource_id, COUNT(*) AS t_comments
                          FROM resource_comments
                          GROUP BY resource_id
                        ) AS comments
                        ON resources.id = comments.resource_id
                      LEFT JOIN (
                        SELECT resource_id, COUNT(*) AS t_likes
                          FROM resource_likes
                          WHERE liked = true
                          GROUP BY resource_id
                        ) AS likes
                        ON resources.id = likes.resource_id
                      LEFT JOIN (
                          SELECT resource_id, ROUND(AVG(rating), 2) AS avg_rating FROM resource_ratings
                          GROUP BY resource_id
                          ) AS avgRating
                      ON resources.id = avgRating.resource_id
                      LEFT JOIN (
                        SELECT resource_id as rs_id_user, liked FROM resource_likes
                        WHERE user_id = $1
                      ) AS rsUserLiked
                      ON resources.id = rsUserLiked.rs_id_user
                      ORDER BY resources.created_at DESC`;
  
  return db.query(queryString, [userId])
    .then(data => {
      // console.log("all resources from database ------here --", data.rows);
      return data.rows;
    })
    .catch(error => {
      console.error("Error retrieving resources in queries:", error);
      throw error;
    });
};

const getResourceByUserId = function(userId) {
  const queryString = `SELECT resources.*, users.username, users.avatar,
                      COALESCE(comments.t_comments, 0) AS t_comments,
                      COALESCE(likes.t_likes, 0) AS t_likes,
                      COALESCE(round(avgRating.avg_rating,1), 0) AS avg_rating,
                      COALESCE(rsUserLiked.liked, false) AS liked_rs_by
                      FROM resources
                      LEFT JOIN users ON resources.user_id = users.id
                      LEFT JOIN (
                        SELECT resource_id, COUNT(*) AS t_comments
                        FROM resource_comments
                        GROUP BY resource_id
                        ) AS comments
                      ON resources.id = comments.resource_id
                      LEFT JOIN (
                        SELECT resource_id, COUNT(*) AS t_likes
                        FROM resource_likes
                        GROUP BY resource_id
                        ) AS likes
                      ON resources.id = likes.resource_id
                      LEFT JOIN (
                        SELECT resource_id, ROUND(AVG(rating), 2) AS avg_rating FROM resource_ratings
                        GROUP BY resource_id
                        ) AS avgRating
                      ON resources.id = avgRating.resource_id
                      LEFT JOIN (
                        SELECT resource_id as rs_id_user, liked FROM resource_likes
                        WHERE user_id = $1
                      ) AS rsUserLiked
                      ON resources.id = rsUserLiked.rs_id_user
                      WHERE resources.user_id = $1
                      ORDER BY resources.created_at DESC`;
  return db.query(queryString, [userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error getResourceByUserId in queries:", error);
      throw error;
    });
};

const getMaxIDFromResource = () => {
  return db.query('SELECT MAX(id) FROM RESOURCES')
    .then(data => {
      console.log(`--------------max resource id in resource table------------${JSON.stringify(data)}`);
      return data.rows[0].max;
    })
    .catch(err => {
      console.log('get max resource id qurey error:', err.stack);
    });
};

const getResourceById = function(id) {
  // const queryString = `SELECT resources.*, count(resource_likes.id) as t_likes, users.username, users.avatar
  //       FROM resources
  //       LEFT JOIN users ON resources.user_id = users.id
  //       LEFT JOIN resource_likes ON resource_likes.resource_id = resources.id
  //       WHERE resources.id = $1
  //       GROUP BY resources.id, users.username, users.avatar`;
  const queryString = `SELECT resources.*, users.username, users.avatar
  FROM resources
  LEFT JOIN users ON resources.user_id = users.id
  WHERE resources.id = $1
  GROUP BY resources.id, users.username, users.avatar`;
  return db.query(queryString, [id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error getResourceById in queries:", error);
      throw error;
    });
};

const getResourceUserLiked = function(userId) {
  const queryString = `SELECT resources.*, users.username, users.avatar,
                    COALESCE(comments.t_comments, 0) AS t_comments,
                    COALESCE(likes.t_likes, 0) AS t_likes,
                    COALESCE(round(avgRating.avg_rating,1), 0) AS avg_rating
                    FROM resources
                    LEFT JOIN users ON resources.user_id = users.id
                    LEFT JOIN (
                      SELECT resource_id, COUNT(*) AS t_comments
                      FROM resource_comments
                      GROUP BY resource_id
                      ) AS comments
                    ON resources.id = comments.resource_id
                    LEFT JOIN (
                      SELECT resource_id, COUNT(*) AS t_likes
                      FROM resource_likes
                      GROUP BY resource_id
                      ) AS likes
                    ON resources.id = likes.resource_id
                    LEFT JOIN (
                      SELECT resource_id, ROUND(AVG(rating), 2) AS avg_rating FROM resource_ratings
                      GROUP BY resource_id
                      ) AS avgRating
                    ON resources.id = avgRating.resource_id
                    WHERE resources.id IN (
                            SELECT resource_id
                            FROM resource_likes
                            WHERE user_id = $1 AND liked = true
                            ) 
                    AND resources.user_id != $1
                    ORDER BY resources.created_at DESC;`;
  return db.query(queryString, [userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error("Error getResourceUserLiked in queries:", error);
      throw error;
    });
};

const getResourceByCategoryId = function(id) {
  const queryString = `SELECT resources.*, count(resource_likes.id) as t_likes, users.username, users.avatar
        FROM resources
        LEFT JOIN users ON resources.user_id = users.id
        LEFT JOIN resource_likes ON resource_likes.resource_id = resources.id
        WHERE resources.category_id = $1
        GROUP BY resources.id, users.username, users.avatar`;
  return db.query(queryString, [id])
    .then(data => {
      console.log("++++++", data.rows);
      return data.rows;
    })
    .catch(error => {
      console.error("Error getResourceByCategoryId in queries:", error);
      throw error;
    });
};
// getResourceByCategoryId(1);



module.exports = { addResource, getAllResource, getResourceByUserId, getMaxIDFromResource,getResourceById, getResourceUserLiked, getResourceByCategoryId};


